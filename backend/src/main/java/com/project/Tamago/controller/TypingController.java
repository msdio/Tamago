package com.project.Tamago.controller;

import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.exceptionHandler.ErrorCode;
import com.project.Tamago.service.ShortTypingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingController {

	private final ShortTypingService shortTypingService;

	@GetMapping("/short-typing")
	public ShortTypingListResDto findShortTypings(@RequestParam String language) {

		if (Stream.of("korean", "english", "code")
			.noneMatch(element -> element.equals(language)))
			throw new CustomException(ErrorCode.INVALID_PARAMETER);

		return shortTypingService.findRandomShortTyping(language);
	}
}
