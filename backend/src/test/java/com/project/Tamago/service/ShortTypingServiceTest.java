package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.dto.ShortTypingDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.repository.TypingRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class ShortTypingServiceTest {

	@Autowired
	private ShortTypingSerivce shortTypingSerivce;

	@MockBean
	private TypingRepository typingRepository;

	List<Typing> typingList;
	Typing shortTyping;

	@BeforeEach
	public void makeTypings() {
		Typing typing1 = Typing.builder()
			.id(1)
			.content("Test1")
			.build();

		Typing typing2 = Typing.builder()
			.id(2)
			.content("Test2")
			.build();

		shortTyping = Typing.builder()
			.id(3)
			.content("Test3")
			.contentType(false)
			.build();

		typingList = Arrays.asList(typing1, typing2, shortTyping);
		typingRepository.saveAll(typingList);
	}

	@Test
	@DisplayName("타이핑 글을 랜덤으로 30개 가져오기")
	public void getShortTyping() {
		ShortTypingListResDto shortTypingListResDto = shortTypingSerivce.findRandomShortTyping();
		List<ShortTypingDto> shortTypingList = shortTypingListResDto.getTypingWritings();

		assertEquals(shortTypingListResDto.getContentType(), 0);
		assertEquals(shortTypingListResDto.getTypingsType(), "practice");
		assertTrue(shortTypingList.stream().anyMatch(e -> Objects.equals(e.getContent(), "Test3")));
	}

}
