package com.project.Tamago.controller;

import java.util.List;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
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
	public CustomResponse<ShortTypingListResDto> findShortTypings(@RequestParam String language) {
		if (Stream.of(supportLanguage).noneMatch(element -> element.equals(language)))
			throw new CustomException(ErrorCode.INVALID_PARAMETER);

		return new CustomResponse<>(shortTypingService.findRandomShortTyping(language));
	}

	@GetMapping("/long")
	public CustomResponse<List<LongTypingResDto>> findLongTypings() {
		return new CustomResponse<>(longTypingService.findLongTypings());
	}

	@GetMapping("/long/detail")
	public CustomResponse<LongTypingDetailResDto> findLongTyping(HttpServletRequest request,
		@RequestParam(required = true) Integer typingId,
		@RequestParam(required = false) Integer page) {
		String nickname = request.getHeader("nickname");
		return new CustomResponse<>(longTypingService.findLongTyping(nickname, typingId, page));
	}
}
