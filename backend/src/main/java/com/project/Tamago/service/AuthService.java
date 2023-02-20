package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static com.project.Tamago.util.constants.Constant.*;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.JoinReqDto;
import com.project.Tamago.dto.requestDto.LoginReqDto;
import com.project.Tamago.dto.requestDto.PasswordReqDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.util.security.Token;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
	@Value("${jwt.time.refresh}")
	private Long refreshTokenExpireTime;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate<String, Object> redisTemplate;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	public void join(JoinReqDto joinReqDto) {
		checkEmailDuplicate(joinReqDto.getEmail());
		checkNicknameDuplicate(joinReqDto.getNickname());
		User user = joinReqDto.toUser();
		user.encodePassword(passwordEncoder, joinReqDto.getPassword());
		userRepository.save(user);
	}

	public String login(LoginReqDto loginReqDto) {
		Authentication authentication = attemptAuthentication(loginReqDto);
		return jwtTokenProvider.createAccessToken(authentication);
	}

	public Token loginAuto(LoginReqDto loginReqDto) {
		Authentication authentication = attemptAuthentication(loginReqDto);
		Token token = jwtTokenProvider.createToken(authentication);
		redisTemplate.opsForValue()
			.set(REFRESH_TOKEN + COLON + authentication.getName(), token.getRefreshToken(),
				refreshTokenExpireTime, TimeUnit.MILLISECONDS);
		return token;
	}

	public String reissue(String accessToken, String refreshToken) {
		jwtTokenProvider.checkAccessTokenExpiration(accessToken);
		jwtTokenProvider.validateRefreshToken(refreshToken);

		Authentication authentication = jwtTokenProvider.getAuthenticationFromRef(refreshToken);

		String redisRefreshToken = String.valueOf(
			redisTemplate.opsForValue().get(REFRESH_TOKEN + COLON + authentication.getName()));
		if (!redisRefreshToken.equals(refreshToken)) {
			throw new CustomException(DIFFERENT_REFRESH_TOKEN);
		}
		return jwtTokenProvider.createAccessToken(authentication);
	}

	public void modifyPassword(PasswordReqDto passwordReqDto) {
		String email = passwordReqDto.getEmail();

		User user = userRepository.findByEmailAndProvider(email, PROVIDER_NONE)
			.orElseThrow(() -> new CustomException(USERS_EMPTY_USER_EMAIL));
		user.encodePassword(passwordEncoder, passwordReqDto.getNewPassword());
	}

	@Transactional(readOnly = true)
	public void checkEmailDuplicate(String email) {
		if (userRepository.existsByEmailAndProvider(email, PROVIDER_NONE)) {
			throw new CustomException(USERS_EXISTS_EMAIL);
		}
	}

	@Transactional(readOnly = true)
	public void checkEmailExistence(String email) {
		if (!userRepository.existsByEmailAndProvider(email, PROVIDER_NONE)) {
			throw new CustomException(USERS_EMPTY_USER_EMAIL);
		}
	}

	private void checkNicknameDuplicate(String nickname) {
		if (userRepository.existsByNickname(nickname)) {
			throw new CustomException(USERS_EXISTS_NICKNAME);
		}
	}

	private Authentication attemptAuthentication(LoginReqDto loginReqDto) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
			loginReqDto.getEmail(), loginReqDto.getPassword());
		return authenticationManagerBuilder.getObject().authenticate(authenticationToken);
	}
}
