package com.project.tamago.controller;

import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.tamago.common.annotation.Login;
import com.project.tamago.common.enums.Language;
import com.project.tamago.common.enums.ResponseCode;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.common.response.CustomResponse;
import com.project.tamago.dto.LoginResolverDto;
import com.project.tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.tamago.dto.responseDto.ShortTypingListResDto;
import com.project.tamago.service.TypingExamService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/typing/exam")
public class TypingExamController {
	private final TypingExamService typingExamService;

	@GetMapping("/long")
	public CustomResponse<LongTypingDetailResDto> findLongExam(@RequestParam String language,
		@Login LoginResolverDto loginResolverDto) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		return new CustomResponse<>(
			typingExamService.findLongExam(loginResolverDto.getUserId(), Language.valueOf(language)));
	}
	@GetMapping("/short")
	public CustomResponse<ShortTypingListResDto> findShortExam(@RequestParam String language,
		@Login LoginResolverDto loginResolverDto) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		return new CustomResponse<>(typingExamService.findShortExam(loginResolverDto.getUserId(), Language.valueOf(language)));
	}

	@PostMapping("/penalties")
	public CustomResponse<Void> savePenalties(@RequestParam String language, @Login LoginResolverDto loginResolverDto) {
		if (Stream.of(Language.values()).noneMatch(element -> element.name().equals(language)))
			throw new CustomException(ResponseCode.INVALID_PARAMETER);
		typingExamService.savePenalties(loginResolverDto.getUserId(), Language.valueOf(language));
		return new CustomResponse<>();
	}

}
