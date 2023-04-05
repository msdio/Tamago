package com.project.Tamago.service;

import static com.project.Tamago.common.Constant.*;

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
import com.project.Tamago.util.TypingUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShortTypingService {
	private final TypingRepository typingRepository;

	public ShortTypingListResDto findRandomShortTyping(String language) {
		List<ShortTypingDto> shortTypingDtos = TypingUtil.getRandomShortTypings(typingRepository.findByContentTypeIsFalseAndLanguageIs(language), PRACTICE_SHORT_TYPING_SIZE);
		return new ShortTypingListResDto(0, "practice", shortTypingDtos);
	}
}
