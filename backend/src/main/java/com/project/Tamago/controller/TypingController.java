package com.project.Tamago.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.service.ShortTypingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingController {

	private final ShortTypingService shortTypingService;

	@GetMapping("/short")
	public ShortTypingListResDto findShortTypings() {
		return shortTypingService.findRandomShortTyping();
	}
}
