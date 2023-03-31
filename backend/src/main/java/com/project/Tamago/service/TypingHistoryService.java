package com.project.Tamago.service;

import static com.project.Tamago.common.enums.ResponseCode.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.TypingHistoryRepository;
import com.project.Tamago.repository.TypingRepository;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.jwt.JwtTokenProvider;

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
