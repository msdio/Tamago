package com.project.Tamago.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.service.ShortTypingService;

@SpringBootTest
@AutoConfigureMockMvc
public class ShortTypingControllerTest {

	@MockBean
	private ShortTypingService shortTypingService;
	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("짧은 글 가져오기")
	public void findProfile() throws Exception {
		// given
		doReturn(new ShortTypingListResDto(null, null, null)).when(shortTypingService).findRandomShortTyping();
		// when
		ResultActions resultActions = mockMvc.perform(get("/typing/short-typing"));
		// then
		resultActions.andExpectAll(status().isOk());
	}

}