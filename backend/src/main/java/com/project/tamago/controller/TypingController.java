package com.project.tamago.controller;

import java.util.stream.Stream;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.tamago.common.annotation.Ip;
import com.project.tamago.common.annotation.Login;
import com.project.tamago.common.enums.Language;
import com.project.tamago.common.enums.ResponseCode;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.common.exception.InvalidParameterException;
import com.project.tamago.common.response.CustomResponse;
import com.project.tamago.dto.LoginResolverDto;
import com.project.tamago.dto.requestDto.LongTypingReqDto;
import com.project.tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.tamago.dto.responseDto.LongTypingResDto;
import com.project.tamago.dto.responseDto.ShortTypingListResDto;
import com.project.tamago.service.LongTypingService;
import com.project.tamago.service.ShortTypingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingController {

	private final ShortTypingService shortTypingService;
	private final LongTypingService longTypingService;

	@GetMapping("/short")
	public CustomResponse<ShortTypingListResDto> findShortTypings(@RequestParam String language) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		return new CustomResponse<>(shortTypingService.findRandomShortTyping(language));
	}

	@GetMapping("/long")
	public CustomResponse<LongTypingResDto> findLongTypings(
		@RequestParam(required = false, defaultValue = "1") int page,
		@RequestParam(required = false, defaultValue = "latest") String sortBy) {
		return new CustomResponse<>(longTypingService.findLongTypings(page, sortBy));
	}

	@GetMapping("/long/detail")
	public CustomResponse<LongTypingDetailResDto> findLongTypingDetail(@Ip String ip,
		@RequestParam Integer longTypingId,
		@RequestParam(required = false, defaultValue = "1") int page) {
		return new CustomResponse<>(longTypingService.findLongTypingDetail(ip, longTypingId, page));
	}

	@PostMapping("/register")
	public CustomResponse<Void> saveTyping(@Login LoginResolverDto loginResolverDto,
		@Validated @RequestBody LongTypingReqDto longTypingReqDto,
		BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		longTypingService.saveLongTyping(loginResolverDto.getUserId(), longTypingReqDto);
		return new CustomResponse<>();
	}
}
