package com.project.Tamago.controller;

import static com.project.Tamago.constants.Constant.*;

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

import com.project.Tamago.dto.CustomResponse;
import com.project.Tamago.dto.SuccessMessage;
import com.project.Tamago.dto.requestDto.JoinReqDto;
import com.project.Tamago.dto.requestDto.LoginReqDto;
import com.project.Tamago.dto.requestDto.PasswordReqDto;
import com.project.Tamago.exception.InvalidParameterException;
import com.project.Tamago.service.AuthService;
import com.project.Tamago.security.Token;

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
	public SuccessMessage join(@Validated @RequestBody JoinReqDto joinReqDto, BindingResult result) {
		if (result.hasErrors()) {
			throw new InvalidParameterException(result);
		}
		authService.join(joinReqDto);
		return new SuccessMessage();
	}

	@PostMapping("/login")
	public CustomResponse<String> login(@RequestBody LoginReqDto loginReqDto) {
		return new CustomResponse<>(authService.login(loginReqDto));
	}

	@PostMapping("/login/auto")
	public CustomResponse<String> loginAuto(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
		Token token = authService.loginAuto(loginReqDto);

		ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN, token.getRefreshToken())
			.maxAge(refreshTokenExpireTime)
			.httpOnly(true)
			.path("/")
			.build();
		response.setHeader("Set-Cookie", cookie.toString());

		return new CustomResponse<>(token.getAccessToken());
	}

	@PostMapping("/jwt")
	public CustomResponse<String> reissue(@RequestBody String accessToken,
		@RequestHeader(value = REFRESH_TOKEN, required = false) String refreshToken) {
		return new CustomResponse<>(authService.reissue(accessToken, refreshToken));
	}

	@GetMapping("/email")
	public SuccessMessage checkEmailDuplicate(@RequestParam(required = true) String email) {
		authService.checkEmailDuplicate(email);
		return new SuccessMessage();
	}

	@GetMapping("/email/existence")
	public SuccessMessage checkEmailExistence(@RequestParam(required = true) String email) {
		authService.checkEmailExistence(email);
		return new SuccessMessage();
	}

	@PatchMapping("/password")
	public SuccessMessage modifyPassword(@RequestBody PasswordReqDto passwordReqDto) {
		authService.modifyPassword(passwordReqDto);
		return new SuccessMessage();
	}
}
