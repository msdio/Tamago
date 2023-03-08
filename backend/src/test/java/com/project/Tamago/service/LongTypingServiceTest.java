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

import com.project.Tamago.constants.enums.Language;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.repository.LongTypingRepository;

@SpringBootTest
@AutoConfigureMockMvc
class LongTypingServiceTest {
	@Autowired
	private LongTypingService longTypingService;
	@MockBean
	private LongTypingRepository longTypingRepository;

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
		when(longTypingRepository.findAll()).thenReturn(longTypings);

		List<LongTypingResDto> expectedLongTypingResDtos = longTypings.stream()
			.map(DataMapper.INSTANCE::LongTypingToLongTypingResDto)
			.collect(Collectors.toList());

		// when
		List<LongTypingResDto> actualLongTypingResDtos = longTypingService.findLongTypings();

		// then
		assertEquals(expectedLongTypingResDtos, actualLongTypingResDtos);
	}

	@Test
	@DisplayName("긴글 세부 조회 성공 테스트")
	public void testFindLongTypingSuccess() {
		// given
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
		LongTypingDetailResDto actualLongTypingDetailResDto = longTypingService.findLongTyping(longTypingId, page);

		// then
		assertEquals(expectedPageContentDto.getContent(), actualLongTypingDetailResDto.getContent());
		assertEquals(expectedPageContentDto.getPage(), actualLongTypingDetailResDto.getCurrentPage());
	}

	@Test
	@DisplayName("긴글 세부 조회 실패 테스트")
	public void testFindLongTypingFail() {
		// given
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
		LongTypingDetailResDto actualLongTypingDetailResDto = longTypingService.findLongTyping(longTypingId, page);

		// then
		assertNotEquals(expectedPageContentDto.getContent(), actualLongTypingDetailResDto.getContent());
		assertNotEquals(expectedPageContentDto.getPage(), actualLongTypingDetailResDto.getCurrentPage());
	}
}