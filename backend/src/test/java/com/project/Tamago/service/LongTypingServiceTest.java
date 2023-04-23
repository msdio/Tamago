package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithMockUser;

import com.project.Tamago.common.enums.Language;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.requestDto.LongTypingReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.LongTypingDto;
import com.project.Tamago.repository.LongTypingRepository;
import com.project.Tamago.repository.RegisterRepository;
import com.project.Tamago.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
class LongTypingServiceTest {
	@Autowired
	private LongTypingService longTypingService;
	@MockBean
	private LongTypingRepository longTypingRepository;

	@MockBean
	private RegisterRepository registerRepository;

	@MockBean
	private UserRepository userRepository;
	@MockBean
	private UserService userService;

	@Test
	@DisplayName("긴글 목록 조회 테스트")
	public void testFindLongTypings() {
		// given
		LongTyping longTyping1 = LongTyping.builder()
			.id(1)
			.title("Test title 1")
			.thumbnail("test_thumbnail1")
			.language(Language.ENGLISH)
			.totalPage(10)
			.viewCount(100)
			.build();
		LongTyping longTyping2 = LongTyping.builder()
			.id(2)
			.title("Test title 2")
			.thumbnail("test_thumbnail2")
			.language(Language.KOREAN)
			.totalPage(20)
			.viewCount(200)
			.build();

		List<LongTyping> longTypings = Arrays.asList(longTyping1, longTyping2);
		Page<LongTyping> longTypingsPage = new PageImpl<>(longTypings);

		when(longTypingRepository.findAll(any(PageRequest.class))).thenReturn(longTypingsPage);

		List<LongTypingDto> expectedLongTypingDtos = longTypings.stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());

		// when
		List<LongTypingDto> actualLongTypingDtos = longTypingService.findLongTypings(1).getLongTypings();

		// then
		assertEquals(expectedLongTypingDtos, actualLongTypingDtos);
	}

	@Test
	@DisplayName("긴글 세부 조회 성공 테스트")
	public void testFindLongTypingSuccess() {
		// given
		String ip = "localhost";
		Integer longTypingId = 1;
		Integer page = 2;
		String content = "line 1\r\nline 2\r\nline 3\r\nline 4\r\nline 5\r\nline 6\r\nline 7\r\nline 8\r\nline 9\r\nline 10\r\nline 11\r\nline 12\r\nline 13\r\nline 14\r\nline 15\r\nline 16\r\nline 17\r\nline 18\r\nline 19\r\nline 20\r\nline 21\r\nline 22\r\nline 23\r\nline 24\r\nline 25\r\nline 26\r\nline 27\r\nline 28\r\nline 29\r\nline 30";
		LongTyping longTyping = LongTyping.builder()
			.id(longTypingId)
			.title("Test title")
			.thumbnail("test Thumbnail")
			.content(content)
			.language(Language.ENGLISH)
			.totalPage(10)
			.viewCount(100)
			.build();

		PageContentDto expectedPageContentDto = new PageContentDto(2, "line 21\nline 22\nline 23\nline 24\nline 25\nline 26\nline 27\nline 28\nline 29\nline 30");
		when(longTypingRepository.findByIdAndTotalPageGreaterThanEqual(longTypingId, page)).thenReturn(Optional.of(longTyping));

		// when
		LongTypingDetailResDto actualLongTypingDetailResDto = longTypingService.findLongTyping(ip,longTypingId, page);

		// then
		assertEquals(expectedPageContentDto.getContent(), actualLongTypingDetailResDto.getContent());
		assertEquals(expectedPageContentDto.getPage(), actualLongTypingDetailResDto.getCurrentPage());
	}

	@Test
	@DisplayName("긴글 세부 조회 실패 테스트")
	public void testFindLongTypingFail() {
		// given
		String ip = "localhost";
		Integer longTypingId = 1;
		Integer page = 2;
		String content = "line 1\r\nline 2\r\nline 3\r\nline 4\r\nline 5\r\nline 6\r\nline 7\r\nline 8\r\nline 9\r\nline 10\r\nline 11\r\nline 12\r\nline 13\r\nline 14\r\nline 15\r\nline 16\r\nline 17\r\nline 18\r\nline 19\r\nline 20\r\nline 21\r\nline 22\r\nline 23\r\nline 24\r\nline 25\r\nline 26\r\nline 27\r\nline 28\r\nline 29\r\nline 30";
		LongTyping longTyping = LongTyping.builder()
			.id(longTypingId)
			.title("Test title")
			.thumbnail("test Thumbnail")
			.content(content)
			.language(Language.ENGLISH)
			.totalPage(10)
			.viewCount(100)
			.build();

		PageContentDto expectedPageContentDto = new PageContentDto(1, "line 1\n"
			+ "line 2\n"
			+ "line 3\n"
			+ "line 4\n"
			+ "line 5\n"
			+ "line 6\n"
			+ "line 7\n"
			+ "line 8\n"
			+ "line 9\n"
			+ "line 10\n"
			+ "line 11\n"
			+ "line 12\n"
			+ "line 13\n"
			+ "line 14\n"
			+ "line 15\n"
			+ "line 16\n"
			+ "line 17\n"
			+ "line 18\n"
			+ "line 19\n"
			+ "line 20");
		when(longTypingRepository.findByIdAndTotalPageGreaterThanEqual(longTypingId, page)).thenReturn(Optional.of(longTyping));

		// when
		LongTypingDetailResDto actualLongTypingDetailResDto = longTypingService.findLongTyping(ip,longTypingId, page);

		// then
		assertNotEquals(expectedPageContentDto.getContent(), actualLongTypingDetailResDto.getContent());
		assertNotEquals(expectedPageContentDto.getPage(), actualLongTypingDetailResDto.getCurrentPage());
	}

	@Test
	@DisplayName("긴글 저장 테스트")
	@WithMockUser(username = "1", authorities = {"ROLE_USER"})
	public void testSaveLongTyping() {
		// given
		String jwtToken = "testToken";
		LongTypingReqDto longTypingReqDto = LongTypingReqDto.builder()
			.title("Test title")
			.language("ENGLISH")
			.content("test content")
			.build();
		LongTyping longTyping = DataMapper.INSTANCE.toLongTyping(longTypingReqDto);

		User user = User.builder()
			.id(1)
			.email("test@naver.com")
			.nickname("test")
			.password("1234")
			.build();

		when(userRepository.findById(any())).thenReturn(Optional.ofNullable(user));

		// when
		longTypingService.saveLongTyping(user.getId(), longTypingReqDto);

		// then
		verify(registerRepository, times(1)).save(any());
		assertEquals(longTyping.getContent(), longTypingReqDto.getContent());
	}

}