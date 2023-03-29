package com.project.Tamago.service;

import static com.project.Tamago.common.enums.ResponseCode.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.requestDto.LongTypingReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.PagePositionRepository;
import com.project.Tamago.repository.RegisterRepository;
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
	private final RegisterRepository registerRepository;
	private final UserService userService;

	@Transactional(readOnly = true)
	public List<LongTypingResDto> findLongTypings(int page) {
		PageRequest pageRequest = PageRequest.of(page - 1, 20);
		return longTypingRepository.findAll(pageRequest).stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public LongTypingDetailResDto findLongTyping(Integer longTypingId, int page) {
		LongTyping longTyping = longTypingRepository.findByIdAndTotalPageGreaterThanEqual(longTypingId, page)
			.orElseThrow(() -> new CustomException(LONG_TYPING_INFO_NOT_EXISTS));
		return DataMapper.INSTANCE.LongTypingToLongTypingDetailResDto(longTyping,
			getPageContent(longTyping.getContent(), page));
	}

	public void saveLongTyping(String jwtToken, LongTypingReqDto longTypingReqDto) {
		LongTyping longTyping = DataMapper.INSTANCE.toLongTyping(longTypingReqDto);
		longTypingRepository.save(longTyping);
		registerRepository.save(
			DataMapper.INSTANCE.toRegister(longTyping, null, userService.getUserByJwtToken(jwtToken)));
	}

	private PageContentDto getPageContent(String content, Integer page) {
		String[] contentLines = content.split("\r\n");
		int startIndex = (page - 1) * LINES_PER_PAGE;
		int endIndex = Math.min(startIndex + LINES_PER_PAGE, contentLines.length);
		String pageContent = String.join("\n", Arrays.copyOfRange(contentLines, startIndex, endIndex));
		return new PageContentDto(page, pageContent);
	}
}
