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
import org.springframework.security.test.context.support.WithMockUser;

import com.project.Tamago.common.enums.Language;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Tier;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.TierRepository;
import com.project.Tamago.repository.TypingRepository;
import com.project.Tamago.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
class TypingExamServiceTest {
	@Autowired
	private TypingExamService typingExamService;
	@MockBean
	private LongTypingRepository longTypingRepository;
	@MockBean
	private TypingRepository typingRepository;
	@MockBean
	private TierRepository tierRepository;
	@MockBean
	private UserRepository userRepository;

	@Test
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	public void findLongExamTest() {
		// given
		int userId = 1;
		Language language = Language.ENGLISH;
		String content = "line 1\r\nline 2\r\nline 3\r\nline 4\r\nline 5\r\nline 6\r\nline 7\r\nline 8\r\nline 9\r\nline 10\r\nline 11\r\nline 12\r\nline 13\r\nline 14\r\nline 15\r\nline 16\r\nline 17\r\nline 18\r\nline 19\r\nline 20\r\nline 21\r\nline 22\r\nline 23\r\nline 24\r\nline 25\r\nline 26\r\nline 27\r\nline 28\r\nline 29\r\nline 30";
		LongTyping longTyping = LongTyping.builder()
			.id(1)
			.title("Test title 1")
			.thumbnail("test_thumbnail1")
			.language(Language.ENGLISH)
			.totalPage(10)
			.viewCount(100)
			.content(content)
			.build();

		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		
		when(userRepository.findById(any())).thenReturn(Optional.ofNullable(user));
		when(longTypingRepository.findRandomByLanguage(language.toString())).thenReturn(Optional.of(longTyping));

		// when
		LongTypingDetailResDto result = typingExamService.findLongExam(userId, language);

		// then
		assertNotNull(result);
		assertEquals(result.getTitle(), longTyping.getTitle());
	}

	@Test
	@DisplayName("티어 감점 테스트")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	public void savePenaltiesTest() {
		// given

		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();
		Language language = Language.ENGLISH;
		Tier tier = Tier.builder()
			.user(user)
			.language(language)
			.mmr(1000)
			.level(5)
			.build();

		when(tierRepository.findByUserIdAndLanguage(user.getId(), language)).thenReturn(Optional.of(tier));

		// when
		typingExamService.savePenalties(user.getId(), language);

		// then
		verify(tierRepository, times(1)).findByUserIdAndLanguage(user.getId(), language);
		assertEquals(995, tier.getMmr());
	}

}