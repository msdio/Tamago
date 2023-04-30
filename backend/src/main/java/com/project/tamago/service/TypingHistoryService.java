package com.project.tamago.service;

import static com.project.tamago.common.enums.ResponseCode.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.domain.User;
import com.project.tamago.dto.mapper.DataMapper;
import com.project.tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.repository.LongTypingRepository;
import com.project.tamago.repository.TypingHistoryRepository;
import com.project.tamago.repository.TypingRepository;
import com.project.tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TypingHistoryService {

	private final TypingRepository typingRepository;
	private final LongTypingRepository longTypingRepository;
	private final UserRepository userRepository;
	private final TypingHistoryRepository typingHistoryRepository;

	public void saveHistory(TypingHistoryReqDto typingHistoryReqDto, Integer userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		if (typingHistoryReqDto.getContentType()) {
			typingHistoryRepository.save(DataMapper.INSTANCE.toTypingHistory(typingHistoryReqDto,
				longTypingRepository.getReferenceById(typingHistoryReqDto.getTypingId()), null, user));
			return;
		}
		typingHistoryRepository.save(DataMapper.INSTANCE.toTypingHistory(typingHistoryReqDto,
			null, typingRepository.getReferenceById(typingHistoryReqDto.getTypingId()), user));
	}
}
