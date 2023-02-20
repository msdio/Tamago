package com.project.Tamago.controller;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.SuccessMessage;
import com.project.Tamago.dto.TokenDto;
import com.project.Tamago.dto.requestDto.JoinReqDto;
import com.project.Tamago.dto.requestDto.LoginReqDto;
import com.project.Tamago.exception.InvalidParameterException;
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
	public SuccessMessage join(@Validated @RequestBody JoinReqDto joinReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		authService.join(joinReqDto);
		return new SuccessMessage();
	}

	@PostMapping("/login")
	public TokenDto login(@RequestBody LoginReqDto loginReqDto) {
		return authService.login(loginReqDto);
	}
}
