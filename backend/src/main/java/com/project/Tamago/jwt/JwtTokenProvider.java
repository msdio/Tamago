package com.project.Tamago.jwt;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final String AUTHORITIES_KEY = "auth";

    private Key accessKey;
    private Key refreshKey;

    @Value("${jwt.secret.access}")
    private String accessSecretKey;
    @Value("${jwt.secret.refresh}")
    private String refreshSecretKey;

    @Value("${jwt.time.access}")
    private Long accessTokenExpireTime;
    @Value("${jwt.time.refresh}")
    private Long refreshTokenExpireTime;

    @PostConstruct
    public void initialize() {
        accessKey = Keys.hmacShaKeyFor(getDecodedBytes(accessSecretKey));
        refreshKey = Keys.hmacShaKeyFor(getDecodedBytes(refreshSecretKey));
    }

    private byte[] getDecodedBytes(String encodedSecretKey) {
        return Decoders.BASE64.decode(encodedSecretKey);
    }
}
