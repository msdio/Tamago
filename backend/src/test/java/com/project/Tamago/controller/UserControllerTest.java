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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.service.UserService;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

	@MockBean
	private UserService mockUserService;
	@Autowired
	private MockMvc mockMvc;



	@Test
	@DisplayName("유저 정보 가져오기 성공")
	@WithMockUser(username = "user", authorities = {"ROLE_USER"})
	public void findProfile() throws Exception {
		// given
		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		doReturn(new ProfileResDto(user)).when(mockUserService).findProfileByJwtToken("test");
		// when
		ResultActions resultActions = mockMvc.perform(get("/user/profile")
			.contentType(MediaType.APPLICATION_JSON)
			.header("Authorization", "test")
		);
		// then
		resultActions.andExpect(status().isOk());
	}

}