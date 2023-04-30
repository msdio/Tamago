package com.project.tamago.service;

import static com.project.tamago.common.Constant.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.dto.ShortTypingDto;
import com.project.tamago.dto.responseDto.ShortTypingListResDto;
import com.project.tamago.repository.TypingRepository;
import com.project.tamago.util.TypingUtil;

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
