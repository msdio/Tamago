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
import com.project.Tamago.dto.JoinReqDto;
import com.project.Tamago.dto.LoginReqDto;
import com.project.Tamago.dto.TokenDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.repository.UserRepository;

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

	public TokenDto loginAuto(LoginReqDto loginReqDto) {
		Authentication authentication = attemptAuthentication(loginReqDto);
		TokenDto tokenDto = jwtTokenProvider.createToken(authentication);
		redisTemplate.opsForValue()
			.set("refreshToken:" + authentication.getName(), tokenDto.getRefreshToken(),
				refreshTokenExpireTime, TimeUnit.MILLISECONDS);
		return tokenDto;
	}

	@Transactional(readOnly = true)
	public void checkEmailDuplicate(String email) {
		if (userRepository.existsByEmailAndProvider(email, PROVIDER_NONE)) {
			throw new CustomException(USERS_EXISTS_EMAIL);
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
