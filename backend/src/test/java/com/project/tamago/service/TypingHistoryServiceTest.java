package com.project.tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.common.enums.Language;
import com.project.tamago.domain.LongTyping;
import com.project.tamago.domain.Typing;
import com.project.tamago.domain.TypingHistory;
import com.project.tamago.domain.User;
import com.project.tamago.dto.WrongKey;
import com.project.tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.tamago.repository.LongTypingRepository;
import com.project.tamago.repository.TypingHistoryRepository;
import com.project.tamago.repository.TypingRepository;
import com.project.tamago.repository.UserRepository;
import com.project.tamago.security.jwt.JwtTokenProvider;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class TypingHistoryServiceTest {

	@Autowired
	private TypingHistoryService typingHistoryService;
	@Autowired
	private TypingHistoryRepository typingHistoryRepository;
	@MockBean
	private UserRepository userRepository;
	@MockBean
	private LongTypingRepository longTypingRepository;
	@MockBean
	private TypingRepository typingRepository;
	@MockBean
	private JwtTokenProvider jwtTokenProvider;

	@Test
	@DisplayName("Typing History 단건으로 저장하기")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
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
			.typingAccuracy(10.0)
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
		typingHistoryService.saveHistory(typingHistoryReqDto, 1);
		//then
		assertTrue(typingHistoryRepository.findAll().contains(typingHistory));
	}

	@Test
	@DisplayName("짧은글 전적 저장 성공")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	void testSaveHistoryWithTyping() {
		// given
		WrongKey key = new WrongKey();
		key.setTotal(10);
		key.setCount(1);

		TypingHistoryReqDto typingHistoryReqDto = TypingHistoryReqDto.builder()
			.typingId(1)
			.resultContent("shortTest")
			.typingSpeed(500)
			.mode("PRACTICE")
			.wpm(100)
			.typingAccuracy(90)
			.contentType(false)
			.wrongKeys(Map.of('a',key, 'b', key))
			.build();
		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		Typing typing = Typing.builder()
			.id(1)
			.content("Test1")
			.build();
		LongTyping longTyping = null;

		when(typingRepository.getReferenceById(any())).thenReturn(typing);
		when(userRepository.findById(any())).thenReturn(Optional.of(user));
		when(jwtTokenProvider.getAuthenticationFromAcs(anyString())).thenReturn(
			new UsernamePasswordAuthenticationToken(1, new Object()));
		// when
		typingHistoryService.saveHistory(typingHistoryReqDto, 1);

		// then
		List<TypingHistory> typingHistory = typingHistoryRepository.findByTyping(typing);
		assertEquals(typingHistoryReqDto.getTypingId(), typingHistory.get(typingHistory.size()-1).getTyping().getId());

	}

	@Test
	@DisplayName("긴글 전적 저장 성공")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	void testSaveHistoryWithLongTyping() {
		// given
		WrongKey key = new WrongKey();
		key.setTotal(10);
		key.setCount(1);

		TypingHistoryReqDto typingHistoryReqDto = TypingHistoryReqDto.builder()
			.typingId(1)
			.resultContent("shortTest")
			.typingSpeed(500)
			.mode("PRACTICE")
			.wpm(100)
			.typingAccuracy(90)
			.page(1)
			.contentType(true)
			.wrongKeys(Map.of('a',key, 'b', key))
			.build();
		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		Typing typing = Typing.builder()
			.id(1)
			.content("Test1")
			.build();
		LongTyping longTyping = LongTyping.builder()
			.id(1)
			.title("Test title 1")
			.thumbnail("test_thumbnail1")
			.language(Language.ENGLISH)
			.totalPage(10)
			.viewCount(100)
			.build();

		when(longTypingRepository.getReferenceById(any())).thenReturn(longTyping);
		when(typingRepository.getReferenceById(any())).thenReturn(typing);
		when(userRepository.findById(any())).thenReturn(Optional.of(user));
		when(jwtTokenProvider.getAuthenticationFromAcs(anyString())).thenReturn(
			new UsernamePasswordAuthenticationToken(1, new Object()));
		// when
		typingHistoryService.saveHistory(typingHistoryReqDto, 1);

		// then
		List<TypingHistory> typingHistory = typingHistoryRepository.findByLongTyping(longTyping);
		assertEquals(typingHistoryReqDto.getTypingId(), typingHistory.get(typingHistory.size()-1).getLongTyping().getId());

	}

}
