package com.project.Tamago.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.dto.ShortTypingDto;
import com.project.Tamago.dto.mapper.TypingMapper;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.repository.TypingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShortTypingService {

	private final TypingRepository typingRepository;
	private static final int SHORT_TYPING_SIZE = 30;

	public ShortTypingListResDto findRandomShortTyping() {
		List<ShortTypingDto> shortTypingDtos = getRandomLimit30(typingRepository.findByContentTypeIsFalse());
		return new ShortTypingListResDto(0, "practice", shortTypingDtos);
	}

	private List<ShortTypingDto> getRandomLimit30(List<Typing> shortTypingsAllList) {
		Collections.shuffle(shortTypingsAllList);
		return shortTypingsAllList.stream()
			.limit(SHORT_TYPING_SIZE)
			.map(TypingMapper::toShortTypingDto)
			.collect(Collectors.toList());
	}
}