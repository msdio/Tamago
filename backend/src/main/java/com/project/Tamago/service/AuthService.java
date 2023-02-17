package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static com.project.Tamago.util.constants.Constant.*;

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

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	public void join(JoinReqDto joinReqDto) {
		checkEmailDuplicate(joinReqDto.getEmail());
		checkNicknameDuplicate(joinReqDto.getNickname());
		User user = joinReqDto.toUser();
		user.encodePassword(passwordEncoder, joinReqDto.getPassword());
		userRepository.save(user);
	}

	public TokenDto login(LoginReqDto loginReqDto) {
		Authentication authentication = attemptAuthentication(loginReqDto);
		return new TokenDto(jwtTokenProvider.createAccessToken(authentication), null);
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
		// 1. Email/PW 기반 Authentication 객체 생성
		// 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
			loginReqDto.getEmail(), loginReqDto.getPassword());

		// 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 PrincipalDetailsService 에서 만든 loadUserByUsername 메서드가 실행
		return authenticationManagerBuilder.getObject().authenticate(authenticationToken);
	}
}
