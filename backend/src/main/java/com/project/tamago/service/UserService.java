package com.project.tamago.service;

import static com.project.tamago.common.enums.ResponseCode.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.domain.User;
import com.project.tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.tamago.dto.responseDto.ProfileResDto;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.repository.PagePositionRepository;
import com.project.tamago.dto.mapper.UserMapper;
import com.project.tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final PagePositionRepository pagePositionRepository;

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
}
