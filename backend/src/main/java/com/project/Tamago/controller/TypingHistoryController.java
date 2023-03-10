package com.project.Tamago.controller;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.CustomResponse;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.exception.InvalidParameterException;
import com.project.Tamago.service.TypingHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingHistoryController {

	private final TypingHistoryService typingHistoryService;

	@PostMapping("/history")
	public CustomResponse<Void> saveTypingHistory(@RequestBody @Validated TypingHistoryReqDto typingHistoryReqDto,
		@RequestHeader("Authorization") String jwtToken, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		typingHistoryService.saveHistory(typingHistoryReqDto, jwtToken);
		return new CustomResponse<>();
	}
}
