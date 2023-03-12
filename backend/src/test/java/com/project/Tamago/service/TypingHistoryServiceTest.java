package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.repository.TypingHistoryRepository;
import com.project.Tamago.repository.TypingRepository;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.jwt.JwtTokenProvider;

@SpringBootTest
@AutoConfigureMockMvc
public class TypingHistoryServiceTest {

	@Autowired
	private TypingHistoryService typingHistoryService;

	@Autowired
	private TypingHistoryRepository typingHistoryRepository;
	@MockBean
	private UserRepository userRepository;
	@MockBean
	private TypingRepository typingRepository;
	@MockBean
	private JwtTokenProvider jwtTokenProvider;

	@Test
	@DisplayName("Typing History 단건으로 저장하기")
	@WithMockUser(username = "test", authorities = {"ROLE_USER"})
	@Disabled
	@Transactional
	public void getShortTyping() {
		//given
		LocalDateTime now = LocalDateTime.now();
		TypingHistoryReqDto typingHistoryReqDto = TypingHistoryReqDto.builder()
			.typingId(1)
			.typingSpeed(100)
			.typingAccuracy(50)
			.startTime(now)
			.endTime(now)
			.wpm(50)
			.resultContent("안녕허세유!!")
			.build();
		Typing typing = Typing.builder()
			.content("Test1")
			.build();
		User user = User.builder()
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		TypingHistory typingHistory = TypingHistory
			.builder()
			.user(user)
			.typing(typing)
			.startTime(LocalDateTime.now())
			.endTime(LocalDateTime.now())
			.accuracy(10.0)
			.wpm(10)
			.build();
		// when
		when(jwtTokenProvider.getAuthenticationFromAcs(any())).thenReturn(new Authentication() {
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return null;
			}

			@Override
			public Object getCredentials() {
				return null;
			}

			@Override
			public Object getDetails() {
				return null;
			}

			@Override
			public Object getPrincipal() {
				return null;
			}

			@Override
			public boolean isAuthenticated() {
				return false;
			}

			@Override
			public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

			}

			@Override
			public String getName() {
				return "test";
			}
		});
		when(userRepository.findByNickname(any())).thenReturn(Optional.ofNullable(user));
		when(typingRepository.findById(any())).thenReturn(Optional.ofNullable(typing));
		typingHistoryService.saveHistory(typingHistoryReqDto, "test");
		//then
		assertTrue(typingHistoryRepository.findAll().contains(typingHistory));
	}

}
