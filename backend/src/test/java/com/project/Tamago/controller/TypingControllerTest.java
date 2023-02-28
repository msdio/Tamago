package com.project.Tamago.controller;

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

@SpringBootTest
@AutoConfigureMockMvc
public class TypingControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("짧은 글 가져오기")
	public void findProfile() throws Exception {
		// given

		// when
		ResultActions resultActions = mockMvc.perform(get("/typing/short-typing"));
		// then
		resultActions.andExpectAll(status().isOk());
		resultActions.andExpect(jsonPath("$.contentType", notNullValue()));
		resultActions.andExpect(jsonPath("$.typingsType", notNullValue()));
		resultActions.andExpect(jsonPath("$.typingWritings").exists());
	}

}