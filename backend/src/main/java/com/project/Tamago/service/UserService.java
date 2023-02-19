package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.mapper.UserMapper;
import com.project.Tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;

	public ProfileResDto findProfileByJwtToken(String jwtToken) {
		return UserMapper.convertProfileResDto(getUserByJwtToken(jwtToken));
	}

	public void modifyUserByJwtToken(String jwtToken, ModifyProfileReqDto modifyProfileReqDto) {
		getUserByJwtToken(jwtToken).modifyUserInfo(modifyProfileReqDto);
	}

	private User getUserByJwtToken(String jwtToken) {
		Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);
		User user = userRepository.findByNickname(authentication.getName())
			.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		return user;
	}
}
