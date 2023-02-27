package com.project.Tamago.security.jwt;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static com.project.Tamago.constants.Constant.*;

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
import com.project.Tamago.constants.KeyType;
import com.project.Tamago.security.Token;

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

	public Token createToken(Authentication authentication) {
		return new Token(createAccessToken(authentication), createRefreshToken(authentication));
	}

	public String createAccessToken(Authentication authentication) {
		return createBuilder(KeyType.ACCESS, authentication);
	}

	public String createRefreshToken(Authentication authentication) {
		return createBuilder(KeyType.REFRESH, authentication);
	}

	public Authentication getAuthenticationFromAcs(String token) {
		return getAuthentication(KeyType.ACCESS, token);
	}

	public Authentication getAuthenticationFromRef(String token) {
		return getAuthentication(KeyType.REFRESH, token);
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

	public void checkAccessTokenExpiration(String accessToken) {
		try {
			Jwts
				.parserBuilder().setSigningKey(publicKeys.get(KeyType.ACCESS)).build()
				.parseClaimsJws(accessToken);
			throw new CustomException(NOT_POSSIBLE_REISSUE);
		} catch (ExpiredJwtException e) {
			log.info(POSSIBLE_REISSUE);
		} catch (Exception e) {
			throw new CustomException(NOT_POSSIBLE_REISSUE);
		}
	}

	public void validateAccessToken(String accessToken) throws IllegalArgumentException {
		validateToken(KeyType.ACCESS, accessToken);
	}

	public void validateRefreshToken(String refreshToken) throws IllegalArgumentException {
		validateToken(KeyType.REFRESH, refreshToken);
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

	private void validateToken(KeyType type, String token) {
		try {
			Jwts
				.parserBuilder().setSigningKey(publicKeys.get(type)).build()
				.parseClaimsJws(token);
		} catch (SignatureException e) {
			throw new CustomException(INVALID_SIGNATURE);
		} catch (MalformedJwtException e) {
			throw new CustomException(INVALID_JWT);
		} catch (ExpiredJwtException e) {
			throw new CustomException(EXPIRED_JWT);
		} catch (UnsupportedJwtException e) {
			throw new CustomException(UNSUPPORTED_JWT);
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException();
		}
	}

	private Authentication getAuthentication(KeyType type, String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(publicKeys.get(type))
			.build()
			.parseClaimsJws(token)
			.getBody();

		Collection<? extends GrantedAuthority> authorities = authoritiesFromClaims(claims);
		return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
	}

	private Collection<? extends GrantedAuthority> authoritiesFromClaims(Claims claims) {
		return Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
	}
}
