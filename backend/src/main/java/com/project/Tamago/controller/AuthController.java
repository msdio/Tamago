package com.project.Tamago.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.JoinReqDto;
import com.project.Tamago.dto.LoginReqDto;
import com.project.Tamago.dto.SuccessResDto;
import com.project.Tamago.dto.TokenDto;
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
	public SuccessResDto join(@Valid @RequestBody JoinReqDto joinReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		authService.join(joinReqDto);
		return new SuccessResDto();
	}

	@PostMapping("/login")
	public TokenDto login(@RequestBody LoginReqDto loginReqDto) {
		return authService.login(loginReqDto);
	}
}
