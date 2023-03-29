package com.project.Tamago.service;

import static com.project.Tamago.common.enums.ResponseCode.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.repository.PagePositionRepository;
import com.project.Tamago.security.jwt.JwtTokenProvider;
import com.project.Tamago.dto.mapper.UserMapper;
import com.project.Tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final PagePositionRepository pagePositionRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Transactional(readOnly = true)
	public ProfileResDto findProfileById(Integer userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		return UserMapper.convertProfileResDto(user);
	}

	public void modifyUserById(Integer userId, ModifyProfileReqDto modifyProfileReqDto) {
		User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		user.modifyUserInfo(modifyProfileReqDto);
	}

	@Transactional(readOnly = true)
	public Integer findCurrentPage(Integer userId, Integer longTypingId) {
		return pagePositionRepository.findCurrentPageByUserAndTypingId(userId, longTypingId)
			.orElseThrow(() -> new CustomException(CURRENT_PAGE_NOT_EXISTS));
	}

	public User getUserByJwtToken(String jwtToken) {
		return userRepository.findById(Integer.parseInt(jwtTokenProvider.getAuthenticationFromAcs(jwtToken).getName()))
			.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
	}
}
