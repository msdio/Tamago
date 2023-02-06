package com.project.Tamago.jwt;

import com.project.Tamago.exception.CustomException;
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

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

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

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(publicKeys.get(KeyType.ACCESS))
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
        } catch (SignatureException e) {
            throw new CustomException(INVALID_SIGNATURE);
        } catch (MalformedJwtException e) {
            throw new CustomException(INVALID_JWT);
        } catch (ExpiredJwtException e) {
            throw new CustomException(EXPIRED_JWT);
        } catch (UnsupportedJwtException e) {
            throw new CustomException(UNSUPPORTED_JWT);
        } catch (IllegalArgumentException e) {
            log.error("JWT token compact of handler are invalid.");
        }
        return false;
    }
}
