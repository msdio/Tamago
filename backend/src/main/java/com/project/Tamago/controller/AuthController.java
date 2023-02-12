package com.project.Tamago.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.JoinReqDto;
import com.project.Tamago.dto.SuccessResDto;
import com.project.Tamago.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/join")
	public SuccessResDto join(@RequestBody JoinReqDto joinReqDto) {
		authService.join(joinReqDto);
		return new SuccessResDto();
	}
}
