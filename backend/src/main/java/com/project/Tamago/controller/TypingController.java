package com.project.Tamago.controller;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.CustomResponse;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.exceptionHandler.ErrorCode;
import com.project.Tamago.service.LongTypingService;
import com.project.Tamago.service.ShortTypingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingController {

	private final ShortTypingService shortTypingService;
	private final LongTypingService longTypingService;
	private static final String[] supportLanguage = {"korean", "english", "code"};

	@GetMapping("/short")
	public ShortTypingListResDto findShortTypings(@RequestParam String language) {
		if (Stream.of(supportLanguage).noneMatch(element -> element.equals(language)))
			throw new CustomException(ErrorCode.INVALID_PARAMETER);

		return shortTypingService.findRandomShortTyping(language);
	}

	@GetMapping("/long")
	public CustomResponse<List<LongTypingResDto>> findLongTypings() {
		return new CustomResponse<>(longTypingService.findLongTypings());
	}

	@GetMapping("/long/detail")
	public CustomResponse<LongTypingDetailResDto> findLongTyping(@RequestHeader("Authorization") String jwtToken,
		@RequestParam(required = true) Integer typingId,
		@RequestParam(required = false) Integer page) {
		return new CustomResponse<>(longTypingService.findLongTyping(jwtToken, typingId, page));
	}
}
