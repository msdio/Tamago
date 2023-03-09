package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.ModifyProfileReqDto;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.jwt.JwtTokenProvider;

@SpringBootTest
@AutoConfigureMockMvc
public class UserServiceTest {

	@Autowired
	private UserService userService;
	@MockBean
	private UserRepository userRepository;
	@MockBean
	private JwtTokenProvider jwtTokenProvider;

	@Test
	@DisplayName("유저 정보 변경하기 성공")
	@WithMockUser(username = "test", authorities = {"ROLE_USER"})
	public void modifyUserProfile() {
		// User mock = mock(User.class);
		// given
		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();

		when(userRepository.findById(any())).thenReturn(Optional.of(user));
		when(jwtTokenProvider.getAuthenticationFromAcs(anyString())).thenReturn(
			new UsernamePasswordAuthenticationToken(1, new Object()));

		ModifyProfileReqDto modifyProfileReqDto = new ModifyProfileReqDto("안녕하세요",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55B_AMMO9_gDppDBojupeVFHeQIg4zXSRDJ5COw4h&s");
		// when
		userService.modifyUserByJwtToken("any", modifyProfileReqDto);

		// then
		assertEquals("안녕하세요", user.getIntroduce());
	}
}