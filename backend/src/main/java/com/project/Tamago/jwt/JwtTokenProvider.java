package com.project.Tamago.jwt;

import com.project.Tamago.util.constant.KeyType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.*;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private final Map<KeyType, Key> privateKeys = new EnumMap<>(KeyType.class);
    private final Map<KeyType, Key> publicKeys = new EnumMap<>(KeyType.class);
    private final Map<KeyType, Long> expireTimes = new EnumMap<>(KeyType.class);

    @Value("${jwt.time.access}")
    private Long accessTokenExpireTime;
    @Value("${jwt.time.refresh}")
    private Long refreshTokenExpireTime;

    @PostConstruct
    public void initialize() {
        KeyPair accessKeyPair = generateRSAKeyPair();
        KeyPair refreshKeyPair = generateRSAKeyPair();

        privateKeys.put(KeyType.ACCESS, accessKeyPair.getPrivate());
        publicKeys.put(KeyType.ACCESS, accessKeyPair.getPublic());
        privateKeys.put(KeyType.REFRESH, refreshKeyPair.getPrivate());
        publicKeys.put(KeyType.REFRESH, refreshKeyPair.getPublic());

        expireTimes.put(KeyType.ACCESS, accessTokenExpireTime);
        expireTimes.put(KeyType.REFRESH, refreshTokenExpireTime);
    }

    private KeyPair generateRSAKeyPair() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048, new SecureRandom());
            return generator.generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Failed to generate RSA key pair", e);
        }
    }

    public String createAccessToken(Authentication authentication) {
        return createBuilder(KeyType.ACCESS, authentication);
    }

    public String createRefreshToken(Authentication authentication) {
        return createBuilder(KeyType.REFRESH, authentication);
    }

    private String createBuilder(KeyType type, Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(new Date(new Date().getTime() + expireTimes.get(type)))
                .signWith(privateKeys.get(type), SignatureAlgorithm.RS256)
                .compact();
    }

    public Authentication getAuthenticationFromToken(KeyType type, String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(publicKeys.get(type))
                .build()
                .parseClaimsJws(token)
                .getBody();
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY, String.class).split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
    }

    public Long getExpiration(String accessToken) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(publicKeys.get(KeyType.ACCESS))
                .build()
                .parseClaimsJws(accessToken)
                .getBody()
                .getExpiration();

        Date now = new Date();
        return (expiration.getTime() - now.getTime());
    }

    public boolean validateAccessToken(String accessToken) throws IllegalArgumentException {
        return validateToken(KeyType.ACCESS, accessToken);
    }

    public boolean validateRefreshToken(String refreshToken) throws IllegalArgumentException {
        return validateToken(KeyType.REFRESH, refreshToken);
    }

    private boolean validateToken(KeyType type, String token) {
        try {
            Jwts
                    .parserBuilder().setSigningKey(publicKeys.get(type)).build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token.");
            log.trace("Invalid JWT token trace: {}", e);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);
        } catch (SignatureException e) {
            log.error("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);
        } catch (IllegalArgumentException e) {
            log.error("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);
        }
        return false;
    }
}
