package com.project.Tamago.controller;

import static com.project.Tamago.common.Constant.*;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.response.CustomResponse;
import com.project.Tamago.dto.requestDto.JoinReqDto;
import com.project.Tamago.dto.requestDto.LoginReqDto;
import com.project.Tamago.dto.requestDto.PasswordReqDto;
import com.project.Tamago.common.exception.InvalidParameterException;
import com.project.Tamago.dto.responseDto.LoginAutoResDto;
import com.project.Tamago.dto.responseDto.LoginResDto;
import com.project.Tamago.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	@Value("${jwt.time.refresh}")
	private Long refreshTokenExpireTime;
	private final AuthService authService;

	@PostMapping("/join")
	public CustomResponse<Void> join(@Validated @RequestBody JoinReqDto joinReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		authService.join(joinReqDto);
		return new CustomResponse<>();
	}

	@PostMapping("/login")
	public CustomResponse<LoginResDto> login(@Validated @RequestBody LoginReqDto loginReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		return new CustomResponse<>(authService.login(loginReqDto));
	}

	@PostMapping("/login/auto")
	public CustomResponse<LoginResDto> loginAuto(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
		LoginAutoResDto loginAutoResDto = authService.loginAuto(loginReqDto);
		ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN, loginAutoResDto.getRefreshToken())
			.maxAge(refreshTokenExpireTime)
			.httpOnly(true)
			.path("/")
			.build();
		response.setHeader("Set-Cookie", cookie.toString());
		return new CustomResponse<>(new LoginResDto(loginAutoResDto.getAccessToken(), loginAutoResDto.getNickname()));
	}

	@PostMapping("/jwt")
	public CustomResponse<LoginResDto> reissue(@RequestBody String accessToken,
		@RequestHeader(value = REFRESH_TOKEN, required = false) String refreshToken) {
		return new CustomResponse<>(authService.reissue(accessToken, refreshToken));
	}

	@GetMapping("/email")
	public CustomResponse<Void> checkEmailDuplicate(@RequestParam(required = true) String email) {
		authService.checkEmailDuplicate(email);
		return new CustomResponse<>();
	}

	@GetMapping("/email/existence")
	public CustomResponse<Void> checkEmailExistence(@RequestParam(required = true) String email) {
		authService.checkEmailExistence(email);
		return new CustomResponse<>();
	}

	@PatchMapping("/password")
	public CustomResponse<Void> modifyPassword(@RequestBody PasswordReqDto passwordReqDto) {
		authService.modifyPassword(passwordReqDto);
		return new CustomResponse<>();
	}
}
