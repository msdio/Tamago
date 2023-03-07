package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.project.Tamago.constants.enums.Language;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.mapper.DataMapper;
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
	public void testFindLongTypings() {
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

		List<LongTypingResDto> actualLongTypingResDtos = longTypingService.findLongTypings();

		assertEquals(expectedLongTypingResDtos, actualLongTypingResDtos);
	}
}