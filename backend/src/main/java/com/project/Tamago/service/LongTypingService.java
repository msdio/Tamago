package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.PagePositionRepository;
import com.project.Tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LongTypingService {
	private static final int LINES_PER_PAGE = 20;
	private final UserRepository userRepository;
	private final LongTypingRepository longTypingRepository;
	private final PagePositionRepository pagePositionRepository;

	@Transactional(readOnly = true)
	public List<LongTypingResDto> findLongTypings() {
		return longTypingRepository.findAll().stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public LongTypingDetailResDto findLongTyping(String nickname, Integer typingId, Integer page) {
		if (page == null) {
			page = 1;
			if (StringUtils.hasText(nickname)) {
				User user = userRepository.findByNickname(nickname)
					.orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
			}
		}
		LongTyping longTyping = longTypingRepository.findByIdAndTotalPageGreaterThanEqual(typingId, page)
			.orElseThrow(() -> new CustomException(LONG_TYPING_INFO_NOT_EXISTS));
		PageContentDto pageContentDto = getPageContent(longTyping.getContent(), page);
		return DataMapper.INSTANCE.LongTypingToLongTypingDetailResDto(longTyping, pageContentDto);
	}

	private PageContentDto getPageContent(String content, Integer page) {
		String[] contentLines = content.split("\r\n");
		int startIndex = (page - 1) * LINES_PER_PAGE;
		int endIndex = Math.min(startIndex + LINES_PER_PAGE, contentLines.length);
		String pageContent = String.join("\n", Arrays.copyOfRange(contentLines, startIndex, endIndex));
		return new PageContentDto(page, pageContent);
	}
}
