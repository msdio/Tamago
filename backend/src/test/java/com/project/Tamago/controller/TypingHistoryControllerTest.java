package com.project.Tamago.controller;

import static com.project.Tamago.common.enums.ResponseCode.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.project.Tamago.service.TypingHistoryService;

@SpringBootTest
@AutoConfigureMockMvc
public class TypingHistoryControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	TypingHistoryService mockTypingHistoryService;

	String content;

	private void init1() {
		content = ""
			+ "{\n"
			+ "\t\"typingId\": 123,\n"
			+ "\t\"resultContent\": \"항녕허세요\",\n"
			+ "\t\"startTime\" : \"2022-08-01T00:00:00\",\n"
			+ "\t\"endTime\" : \"2022-08-01T00:00:20\",\n"
			+ "\t\"typingSpeed\" : 550,\n"
			+ "\t\"mode\" : \"PRACTICE\",\n"
			+ "\t\"wpm\" : 100,\n"
			+ "\t\"typingAccuracy\" : 98,\n"
			+ "\t\"contentType\" : false,\n"
			+ "\t\"wrongKeys\": {\n"
			+ "\t\t\"ㅇ\": {\n"
			+ "\t\t\t\"total\" : 3,\n"
			+ "\t\t\t\"count\" : 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅏ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㄴ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅕ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅎ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅅ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅛ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t}\n"
			+ "\t}\n"
			+ "}";
	}
	private void init2() {
		content = ""
			+ "{\n"
			+ "  \"endTime\": \"2023-03-05T16:43:38.575Z\",\n"
			+ "  \"mode\": \"string\",\n"
			+ "  \"resultContent\": \"string\",\n"
			+ "  \"startTime\": \"2023-03-05T16:43:38.575Z\",\n"
			+ "  \"typingAccuracy\": 0,\n"
			+ "  \"typingId\": 0,\n"
			+ "  \"typingPage\": 0,\n"
			+ "}";
	}
	private void init3() {
		content = ""
			+ "{\n"
			+ "\t\"typingId\": 123,\n"
			+ "\t\"resultContent\": \"항녕허세요\",\n"
			+ "\t\"startTime\" : \"2022-08-01T00:00:00\",\n"
			+ "\t\"endTime\" : \"2022-08-01T00:00:20\",\n"
			+ "\t\"typingSpeed\" : 2200,\n"
			+ "\t\"mode\" : \"PRACTICE\",\n"
			+ "\t\"wpm\" : 100,\n"
			+ "\t\"typingAccuracy\" : 98,\n"
			+ "\t\"contentType\" : false,\n"
			+ "\t\"wrongKeys\": {\n"
			+ "\t\t\"ㅇ\": {\n"
			+ "\t\t\t\"total\" : 3,\n"
			+ "\t\t\t\"count\" : 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅏ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㄴ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅕ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅎ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅅ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅛ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t}\n"
			+ "\t}\n"
			+ "}";
	}
	private void init4() {
		content = ""
			+ "{\n"
			+ "  \"endTime\": \"2023-03-05T16:43:38.575Z\",\n"
			+ "  \"mode\": \"string\",\n"
			+ "  \"resultContent\": \"string\",\n"
			+ "  \"startTime\": \"2023-03-05T16:43:38.575Z\",\n"
			+ "  \"typingAccuracy\": 0,\n"
			+ "\t\"contentType\" : false,\n"
			+ "  \"typingId\": 0,\n"
			+ "  \"typingPage\": 0,\n"
			+ "  \"typingSpeed\": 0,\n"
			+ "  \"wpm\": 0,\n"
			+ "  \"wrongKeys\": {\n"
			+ "    \"additionalProp1\": {\n"
			+ "      \"count\": 0,\n"
			+ "      \"total\": 0\n"
			+ "    },\n"
			+ "    \"additionalProp2\": {\n"
			+ "      \"count\": 0,\n"
			+ "      \"total\": 0\n"
			+ "    },\n"
			+ "    \"additionalProp3\": {\n"
			+ "      \"count\": 0,\n"
			+ "      \"total\": 0\n"
			+ "    }\n"
			+ "  }\n"
			+ "}";
	}
	private void init5() {
		content = ""
			+ "{\n"
			+ "\t\"typingId\": 123,\n"
			+ "\t\"resultContent\": \"항녕허세요\",\n"
			+ "\t\"startTime\" : \"2022-08-01T00:00:00\",\n"
			+ "\t\"endTime\" : \"2022-08-01T00:00:20\",\n"
			+ "\t\"typingSpeed\" : 550,\n"
			+ "\t\"mode\" : \"PRACTICE\",\n"
			+ "\t\"wpm\" : 100,\n"
			+ "\t\"typingAccuracy\" : 98,\n"
			+ "\t\"contentType\" : false,\n"
			+ "\t\"wrongKeys\": {\n"
			+ "\t\t\"ㅇ\": {\n"
			+ "\t\t\t\"total\" : 3,\n"
			+ "\t\t\t\"count\" : 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅏ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㄴ\": {\n"
			+ "\t\t\t\"total\" : 2,\n"
			+ "\t\t\t\"count\": 1\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅕ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅎ\": {\n"
			+ "\t\t\t\"count\": 30\n"
			+ "\t\t\t\"total\" : 10,\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅅ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t},\n"
			+ "\t\t\"ㅛ\": {\n"
			+ "\t\t\t\"total\" : 1,\n"
			+ "\t\t\t\"count\": 0\n"
			+ "\t\t}\n"
			+ "\t}\n"
			+ "}";
	}


	@Test
	@DisplayName("Typing History 등록 성공")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	public void saveTypingHistorySuccess() throws Exception {
		// given
		init1();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any")
			.content(content)
			.contentType(MediaType.APPLICATION_JSON));
		// then
		resultActions.andExpectAll(status().is2xxSuccessful());
		resultActions.andExpect(jsonPath("$.code").value(1000));
		resultActions.andExpect(jsonPath("$.description").value("응답 성공"));
		resultActions.andReturn();
	}

	@Test
	@DisplayName("Typing History 등록 실패 : 파라미터가 없는 경우")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void saveTypingHistoryFailNullContent() throws Exception {
		// given
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any"));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}


	@Test
	@DisplayName("Typing History 등록 실패 : INPUT 정보가 부족한 경우")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void saveTypingHistoryFailInvaildContent() throws Exception {
		// given
		init2();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any")
			.content(content)
			.contentType(MediaType.APPLICATION_JSON));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}


	@Test
	@DisplayName("Typing History 등록 실패 : 타자가 2000타가 넘는 경우")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void saveTypingHistoryFailInvaildOverContent() throws Exception {
		// given
		init3();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any")
			.content(content)
			.contentType(MediaType.APPLICATION_JSON));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}


	@Test
	@DisplayName("Typing History 등록 실패 : wrongKeys에 유효한 값이 들어있지 않은 경우")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void saveTypingHistoryFailInvaildWrongKeys() throws Exception {
		// given
		init4();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any")
			.content(content)
			.contentType(MediaType.APPLICATION_JSON));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}

	@Test
	@DisplayName("Typing History 등록 실패 : wrongKeys에 유효한 값이 들어있지 않은 경우2")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void saveTypingHistoryFailInvaildWrongKeys2() throws Exception {
		// given
		init5();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.header("Authorization", "any")
			.content(content)
			.contentType(MediaType.APPLICATION_JSON));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(INVALID_PARAMETER.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(INVALID_PARAMETER.getDescription()));
		resultActions.andReturn();
	}


	@Test
	@DisplayName("Typing History 등록 실패 : 로그인 하지 않은 경우")
	public void saveTypingHistoryFailNotLogin() throws Exception {
		// given
		init1();
		// when
		ResultActions resultActions = mockMvc.perform(post("/typing/history")
			.content(content));
		// then
		resultActions.andExpectAll(status().is4xxClientError());
		resultActions.andExpect(jsonPath("$.code").value(EMPTY_JWT.getCode()));
		resultActions.andExpect(jsonPath("$.description").value(EMPTY_JWT.getDescription()));
		resultActions.andReturn();
	}

}