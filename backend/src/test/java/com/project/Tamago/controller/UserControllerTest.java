package com.project.Tamago.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.dto.responseDto.ProfileResDto;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.service.UserService;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

	@Autowired
	private UserService userService;
	@MockBean
	private UserRepository userRepository;
	@MockBean
	private JwtTokenProvider jwtTokenProvider;
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
		doReturn(new ProfileResDto(user)).when(userService).findProfileByJwtToken("test");
		// when
		ResultActions resultActions = mockMvc.perform(get("/user/profile")
			.contentType(MediaType.APPLICATION_JSON)
			.header("Authorization", "test")
		);
		// then
		resultActions.andExpect(status().isOk());
	}

	@Test
	@DisplayName("유저 정보 변경하기")
	@WithMockUser(username = "test", authorities = {"ROLE_USER"})
	public void modifyUserProfile() throws Exception {
		// given
		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();

		when(userRepository.findByNickname(any())).thenReturn(Optional.of(user));
		when(jwtTokenProvider.getAuthentication(anyString())).thenReturn(new UsernamePasswordAuthenticationToken(new Object(), new Object()));

		ModifyProfileReqDto modifyProfileReqDto = new ModifyProfileReqDto("안녕하세요",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55B_AMMO9_gDppDBojupeVFHeQIg4zXSRDJ5COw4h&s");
		// when
		userService.modifyUserByJwtToken("any", modifyProfileReqDto);

		// then
		assertEquals(user.getIntroduce(), "안녕하세요");
	}
}