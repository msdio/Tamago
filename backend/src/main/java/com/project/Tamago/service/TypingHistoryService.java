package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.repository.TypingHistoryRepository;
import com.project.Tamago.repository.TypingRepository;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TypingHistoryService {

	private final JwtTokenProvider jwtTokenProvider;
	private final TypingRepository typingRepository;
	private final UserRepository userRepository;
	private final TypingHistoryRepository typingHistoryRepository;

	public void saveHistory(TypingHistoryReqDto typingHistoryReqDto, String jwtToken) {

		Map<Character, Map<String, Integer>> wrongs = typingHistoryReqDto.getWrongKeys().entrySet().stream()
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				e -> Map.of("total", e.getValue().getTotal(), "count", e.getValue().getCount())
			));

		typingHistoryRepository.save(DataMapper.INSTANCE.toTypingHistory(typingHistoryReqDto,
			getTyping(typingHistoryReqDto), getUserByJwtToken(jwtToken), wrongs));
	}

	private Typing getTyping(TypingHistoryReqDto typingHistoryReqDto) {
		return typingRepository.findById(typingHistoryReqDto.getTypingId()).orElseThrow(() -> new CustomException(TYPING_INFO_NOT_EXISTS));
	}

	private User getUserByJwtToken(String jwtToken) {
		return userRepository.findById(Integer.parseInt(jwtTokenProvider.getAuthenticationFromAcs(jwtToken).getName()))
			.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
	}
}
