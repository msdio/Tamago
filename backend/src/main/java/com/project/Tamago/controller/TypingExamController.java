package com.project.Tamago.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.response.CustomResponse;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.service.LongTypingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingExamController {

	private final LongTypingService longTypingService;


	@GetMapping("exam/long")
	public CustomResponse<LongTypingDetailResDto> findLongExam() {
		return new CustomResponse<>(longTypingService.findLongExam());
	}
}
