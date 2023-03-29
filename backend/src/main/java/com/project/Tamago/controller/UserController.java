package com.project.Tamago.controller;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.common.annotation.UserId;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.common.exception.InvalidParameterException;
import com.project.Tamago.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@GetMapping("/profile")
	public CustomResponse<ProfileResDto> findProfile(@UserId Integer userId) {
		return new CustomResponse<>(userService.findProfileById(userId));
	}

	@PatchMapping("/profile")
	public CustomResponse<Void> modifyProfile(@UserId Integer userId,
		@Validated @RequestBody ModifyProfileReqDto modifyProfileReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		userService.modifyUserById(userId, modifyProfileReqDto);
		return new CustomResponse<>();
	}

	@GetMapping("/typing/page")
	public CustomResponse<Integer> findCurrentPage(@UserId Integer userId,
		@RequestParam(required = true) Integer longTypingId) {
		return new CustomResponse<>(userService.findCurrentPage(userId, longTypingId));
	}
}
