package com.project.Tamago.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.SuccessMessage;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingHistoryController {


	@PostMapping("/history")
	public SuccessMessage saveTypingHistory(@RequestBody TypingHistoryReqDto typingHistoryReqDto) {

		return new SuccessMessage();
	}
}
