package com.project.Tamago.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.SuccessMessage;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@GetMapping("/profile")
	public ProfileResDto findProfile(@RequestHeader("Authorization") String jwtToken) {
		return userService.findProfileByJwtToken(jwtToken);
	}

	@PatchMapping("/profile")
	public SuccessMessage modifyProfile(@RequestHeader("Authorization") String jwtToken,
		@Validated @RequestBody ModifyProfileReqDto modifyProfileReqDto) {
		userService.modifyUserByJwtToken(jwtToken, modifyProfileReqDto);
		return new SuccessMessage();
	}
}
