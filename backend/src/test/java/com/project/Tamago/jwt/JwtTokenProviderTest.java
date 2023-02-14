package com.project.Tamago.jwt;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.dto.LoginReqDto;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class JwtTokenProviderTest {
	@SpyBean
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("토큰 유효성 검증 테스트")
	public void testLogin() throws Exception {
		// given
		String email = "test@test.com";
		String password = "password";
		LoginReqDto loginReqDto = new LoginReqDto(email, password);
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		// when
		String token = "Invalid_Token";
		when(jwtTokenProvider.createAccessToken(authentication)).thenReturn(token);

		// then
		// assertThrows(new CustomException(INVALID_JWT), () -> jwtTokenProvider.validateAccessToken(token));
	}
}