package com.project.Tamago.controller;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.common.annotation.UserId;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.common.exception.InvalidParameterException;
import com.project.Tamago.service.TypingHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingHistoryController {

	private final TypingHistoryService typingHistoryService;

	@PostMapping("/history")
	public CustomResponse<Void> saveTypingHistory(@RequestBody @Validated TypingHistoryReqDto typingHistoryReqDto,
		@UserId Integer userId, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		typingHistoryService.saveHistory(typingHistoryReqDto, userId);
		return new CustomResponse<>();
	}
}
