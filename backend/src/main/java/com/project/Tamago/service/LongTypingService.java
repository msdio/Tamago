package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.repository.LongTypingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LongTypingService {
	private static final int LINES_PER_PAGE = 20;
	private final LongTypingRepository longTypingRepository;

	@Transactional(readOnly = true)
	public List<LongTypingResDto> findLongTypings() {
		return longTypingRepository.findAll().stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public LongTypingDetailResDto findLongTyping(Integer typingId, Integer page) {
		LongTyping longTyping = longTypingRepository.findByIdAndTotalPageGreaterThanEqual(typingId, page)
			.orElseThrow(() -> new CustomException(LONG_TYPING_INFO_NOT_EXISTS));
		String pageContent = getPageContent(longTyping.getContent(), page);
		return DataMapper.INSTANCE.LongTypingToLongTypingDetailResDto(longTyping, pageContent);
	}

	private static String getPageContent(String content, Integer page) {
		String[] contentLines = content.split("\r\n");
		int startIndex = (page - 1) * LINES_PER_PAGE;
		int endIndex = Math.min(startIndex + LINES_PER_PAGE, contentLines.length);
		StringBuilder pageContent = new StringBuilder();
		for (int index = startIndex; index < endIndex; index++) {
			pageContent.append(contentLines[index]);
			if (index != endIndex - 1) {
				pageContent.append("\n");
			}
		}
		return pageContent.toString();
	}
}
