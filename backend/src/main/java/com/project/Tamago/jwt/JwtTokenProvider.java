package com.project.Tamago.jwt;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.EnumMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.project.Tamago.exception.CustomException;
import com.project.Tamago.util.constants.KeyType;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	private static final String AUTHORITIES_KEY = "auth";
	public static final String AUTHORIZATION_HEADER = "Authorization";
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

	public String createAccessToken(Authentication authentication) {
		return createBuilder(KeyType.ACCESS, authentication);
	}

	public String createRefreshToken(Authentication authentication) {
		return createBuilder(KeyType.REFRESH, authentication);
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

	public String resolveToken(HttpServletRequest request) {
		return request.getHeader(AUTHORIZATION_HEADER);
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

	public boolean validateRefreshToken(String refreshToken) throws IllegalArgumentException {
		return validateToken(KeyType.REFRESH, refreshToken);
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
