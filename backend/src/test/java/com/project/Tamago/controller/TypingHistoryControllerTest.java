package com.project.Tamago.controller;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
public class TypingHistoryControllerTest {

	@Autowired
	private MockMvc mockMvc;



	@Test
	@DisplayName("History 보내기 성공")
	public void saveTypingHistorySuccess() throws Exception {
		// given
		String content = "{\n"
			+ "\t\"typingId\": 123,\n"
			+ "\t\"resultContent\": \"항녕허세요\",\n"
			+ "\t\"startTime\" : \"2022-08-01 00:00:00\",\n"
			+ "\t\"endTime\" : \"2022-08-01 00:00:20\",\n"
			+ "\t\"typingSpeed\" : 550,\n"
			+ "\t\"wpm\" : 100,\n"
			+ "\t\"typingAccuracy\" : 98,\n"
			+ "\t\"wrongKeys\": [\n"
			+ "\t\t\"ㅇ\": {\n"
			+ "\t\t\t\"total\" : 3,\n"
			+ "\t\t\t\"count\" : 1,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅏ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㄴ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅕ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅎ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅅ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅛ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0,\n"
			+ "\t\t}\n"
			+ "\t]\n"
			+ "}";
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.content(content));
		// then
		resultActions.andExpectAll(status().is2xxSuccessful());
		resultActions.andExpect(jsonPath("$.code").value(1000));
		resultActions.andExpect(jsonPath("$.description").value("응답 성공"));
		resultActions.andReturn();
	}

	@Test
	@DisplayName("짧은 글 가져오기 실패 : 유효하지 않은 파라미터")
	public void findShortTypingsFailInvaildParam() throws Exception {
		// given
		String content = null;
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.content(content));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}

}