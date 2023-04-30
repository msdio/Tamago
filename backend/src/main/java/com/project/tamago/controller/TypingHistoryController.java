package com.project.tamago.controller;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.tamago.common.response.CustomResponse;
import com.project.tamago.dto.LoginResolverDto;
import com.project.tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.tamago.common.exception.InvalidParameterException;
import com.project.tamago.service.TypingHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingHistoryController {

	private final TypingHistoryService typingHistoryService;

	@PostMapping("/history")
	public CustomResponse<Void> saveTypingHistory(@RequestBody @Validated TypingHistoryReqDto typingHistoryReqDto,
		@com.project.tamago.common.annotation.Login LoginResolverDto loginResolverDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		typingHistoryService.saveHistory(typingHistoryReqDto, loginResolverDto.getUserId());
		return new CustomResponse<>();
	}
}
