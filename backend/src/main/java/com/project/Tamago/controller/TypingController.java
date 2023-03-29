package com.project.Tamago.controller;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.common.annotation.Login;
import com.project.Tamago.common.exception.InvalidParameterException;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.common.enums.ResponseCode;
import com.project.Tamago.dto.requestDto.LongTypingReqDto;

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
			throw new CustomException(ResponseCode.INVALID_PARAMETER);

		return new CustomResponse<>(shortTypingService.findRandomShortTyping(language));
	}

	@GetMapping("/long")
	public CustomResponse<List<LongTypingResDto>> findLongTypings(
		@RequestParam(required = false, defaultValue = "1") int page) {
		return new CustomResponse<>(longTypingService.findLongTypings(page));
	}

	@GetMapping("/long/detail")
	public CustomResponse<LongTypingDetailResDto> findLongTyping(@RequestParam Integer longTypingId,
		@RequestParam(required = false, defaultValue = "1") int page) {
		return new CustomResponse<>(longTypingService.findLongTyping(longTypingId, page));
	}

	@PostMapping("/register")
	public CustomResponse<Void> saveTyping(@Login Integer userId, @Validated @RequestBody LongTypingReqDto longTypingReqDto,
		BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		longTypingService.saveLongTyping(userId, longTypingReqDto);
		return new CustomResponse<>();
	}
}
