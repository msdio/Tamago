package com.project.Tamago.controller;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@SpringBootTest
@AutoConfigureMockMvc
public class TypingControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("짧은 글 가져오기 : 성공")
	public void findShortTypings() throws Exception {
		// given
		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
		info.add("language", "korean");
		// when
		ResultActions resultActions = mockMvc.perform(get("/typing/short").params(info));
		// then
		resultActions.andExpectAll(status().isOk());
		resultActions.andExpect(jsonPath("$.result.contentType", notNullValue()));
		resultActions.andExpect(jsonPath("$.result.typingsType", notNullValue()));
		resultActions.andExpect(jsonPath("$.result.typingWritings").exists());
		resultActions.andReturn();
	}

	@Test
	@DisplayName("짧은 글 가져오기 실패 : 유효하지 않은 파라미터")
	public void findShortTypingsFailInvaildParam() throws Exception {
		// given
		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
		info.add("language", "asdf");
		// when
		ResultActions resultActions = mockMvc.perform(get("/typing/short").params(info));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}

	@Test
	@DisplayName("짧은 글 가져오기 실패 : 파라미터가 존재하지 않는 경우")
	public void findShortTypingsFailNotContainParam() throws Exception {
		// given

		// when
		ResultActions resultActions = mockMvc.perform(get("/typing/short"));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(NULL_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(NULL_PARAMETER.getDescription()));
		resultActions.andReturn();
	}

}