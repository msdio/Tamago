package com.project.Tamago.service;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.project.Tamago.dto.requestDto.PasswordReqDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
class AuthServiceTest {

	@Autowired
	private AuthService authService;
	@MockBean
	private UserRepository userRepository;

	@Test
	public void testModifyPasswordUserNotFound() {
		// arrange
		PasswordReqDto passwordReqDto = new PasswordReqDto();
		passwordReqDto.setEmail("test@example.com");
		passwordReqDto.setNewPassword("newpassword");

		when(userRepository.findByEmailAndProvider(anyString(), anyString()))
			.thenReturn(Optional.empty());

		// act and assert
		CustomException exception = assertThrows(CustomException.class,
			() -> authService.modifyPassword(passwordReqDto));
		assertEquals(USERS_EMPTY_USER_EMAIL, exception.getErrorCode());
	}
}