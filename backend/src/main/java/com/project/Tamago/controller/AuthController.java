package com.project.Tamago.controller;

import static com.project.Tamago.util.constants.Constant.*;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
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
	public String login(@RequestBody LoginReqDto loginReqDto) {
		return authService.login(loginReqDto);
	}

	@PostMapping("/login/auto")
	public String loginAuto(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
		TokenDto tokenDto = authService.loginAuto(loginReqDto);

		ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN, tokenDto.getRefreshToken())
			.maxAge(refreshTokenExpireTime)
			.httpOnly(true)
			.path("/")
			.build();
		response.setHeader("Set-Cookie", cookie.toString());

		return tokenDto.getAccessToken();
	}

	// @PostMapping("/jwt")
	// public String reissue(HttpServletRequest request,
	// 	@CookieValue(value = "refreshToken", required = false) String refreshToken, @RequestBody String accessToken) {
	// 	return authService.reissue(refreshToken, accessToken);
	// }
}
