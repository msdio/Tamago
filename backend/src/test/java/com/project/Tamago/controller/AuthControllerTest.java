package com.project.Tamago.controller;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.Tamago.dto.JoinReqDto;
import com.project.Tamago.exception.CustomException;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.service.AuthService;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

	@MockBean
	private UserRepository userRepository;
	@MockBean
	private AuthService authService;
	@MockBean
	private PasswordEncoder passwordEncoder;
	@MockBean
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("회원가입 성공")
	public void join() throws Exception {
		// given
		JoinReqDto joinReqDto = JoinReqDto.builder()
			.email("existing_email@example.com")
			.password("password")
			.nickname("nickname").build();
		// when
		ResultActions resultActions = mockMvc.perform(post("/auth/join")
			.contentType(MediaType.APPLICATION_JSON)
			.content(new ObjectMapper().writeValueAsString(joinReqDto)));
		// then
		resultActions.andExpect(status().isOk());
	}

	@Test
	@DisplayName("회원가입 실패: 이메일 중복")
	public void joinWithEmailDuplication() throws Exception {
		// given
		JoinReqDto joinReqDto = JoinReqDto.builder()
			.email("existing_email@example.com")
			.password("password")
			.nickname("nickname").build();

		doThrow(new CustomException(USERS_EXISTS_EMAIL)).when(authService).join(joinReqDto);
		// when
		ResultActions resultActions = mockMvc.perform(post("/auth/join")
			.contentType(MediaType.APPLICATION_JSON)
			.content(new ObjectMapper().writeValueAsString(joinReqDto)));
		// then
		resultActions.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.code").value(USERS_EXISTS_EMAIL.getCode()));
	}

	@Test
	@DisplayName("회원가입 실패: 닉네임 중복")
	public void joinWithNicknameDuplication() throws Exception {
		// given
		JoinReqDto joinReqDto = JoinReqDto.builder()
			.email("existing_email@example.com")
			.password("password")
			.nickname("nickname").build();
		doThrow(new CustomException(USERS_EXISTS_NICKNAME)).when(authService).join(joinReqDto);
		// when
		ResultActions resultActions = mockMvc.perform(post("/auth/join")
			.contentType(MediaType.APPLICATION_JSON)
			.content(new ObjectMapper().writeValueAsString(joinReqDto)));
		// then
		resultActions.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.code").value(USERS_EXISTS_NICKNAME.getCode()));
	}
}