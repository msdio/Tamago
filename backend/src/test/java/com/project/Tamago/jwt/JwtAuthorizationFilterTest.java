package com.project.Tamago.jwt;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.project.Tamago.exception.CustomException;

@ExtendWith(SpringExtension.class)
class JwtAuthorizationFilterTest {
	
	@Mock
	private JwtTokenProvider jwtTokenProvider;
	private final String INVALID_TOKEN = "invalidToken";

	@DisplayName("유효하지 않은 토큰 검증 테스트")
	@Test
	public void invalidTokenTest() throws Exception {
		try {
			jwtTokenProvider.validateAccessToken(INVALID_TOKEN);
		} catch (CustomException e) {
			assertEquals(e.getErrorCode().getCode(), INVALID_JWT.getCode());
		}
	}

	@DisplayName("토큰값이 비어있을때 테스트")
	@Test
	public void emptyTokenTest() throws Exception {
		String token = null;
		try {
			jwtTokenProvider.validateAccessToken(token);
		} catch (CustomException e) {
			assertEquals(e.getErrorCode().getCode(), EMPTY_JWT.getCode());
		}
	}
}