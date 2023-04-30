package com.project.tamago.jwt;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.dto.requestDto.LoginReqDto;
import com.project.tamago.security.jwt.JwtTokenProvider;

@SpringBootTest
@Transactional
class JwtTokenProviderTest {
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Test
	@DisplayName("토큰 유효성 검증 테스트")
	public void testLogin() throws Exception {
		// given
		String email = "test@test.com";
		String password = "password";
		LoginReqDto loginReqDto = new LoginReqDto(email, password);
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		// when
		String token = jwtTokenProvider.createAccessToken(authentication);
		// then
		jwtTokenProvider.validateAccessToken(token);
	}
}