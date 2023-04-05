package com.project.Tamago.controller;

import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.annotation.Login;
import com.project.Tamago.common.enums.Language;
import com.project.Tamago.common.enums.ResponseCode;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.common.response.CustomResponse;
import com.project.Tamago.dto.LoginResolverDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.service.LongTypingService;
import com.project.Tamago.service.TypingExamService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingExamController {
	private final TypingExamService typingExamService;

	@GetMapping("exam/long")
	public CustomResponse<LongTypingDetailResDto> findLongExam(@RequestParam String language,
		@Login LoginResolverDto loginResolverDto) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		return new CustomResponse<>(
			typingExamService.findLongExam(loginResolverDto.getUserId(), Language.valueOf(language)));
	}
	@GetMapping("exam/short")
	public CustomResponse<ShortTypingListResDto> findShortExam(@RequestParam String language,
		@Login LoginResolverDto loginResolverDto) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		return new CustomResponse<>(typingExamService.findShortExam(loginResolverDto.getUserId(), Language.valueOf(language)));
	}
}