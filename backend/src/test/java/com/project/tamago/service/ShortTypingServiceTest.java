package com.project.tamago.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.domain.Typing;
import com.project.tamago.dto.ShortTypingDto;
import com.project.tamago.dto.responseDto.ShortTypingListResDto;
import com.project.tamago.repository.TypingRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class ShortTypingServiceTest {

	@Autowired
	private ShortTypingService shortTypingService;

	@Autowired
	private TypingRepository typingRepository;

	List<Typing> typingList;
	ShortTypingDto shortTypingDto;

	private void makeTypings() {
		Typing typing1 = Typing.builder()
			.content("Test1")
			.build();

		Typing typing2 = Typing.builder()
			.content("Test2")
			.build();

		Typing typing3 = Typing.builder()
			.content("Test3")
			.contentType(false)
			.build();

		typingList = Arrays.asList(typing1, typing2, typing3);
		typingRepository.saveAll(typingList);

		shortTypingDto = ShortTypingDto.builder()
			.typingId(typing3.getId())
			.content(typing3.getContent())
			.build();
	}

	@Test
	@DisplayName("타이핑 글을 랜덤으로 30개 가져오기")
	@Transactional
	public void getShortTyping() {
		//given
		makeTypings();

		// when
		ShortTypingListResDto shortTypingListResDto = shortTypingService.findRandomShortTyping("korean");
		List<ShortTypingDto> shortTypingList = shortTypingListResDto.getTypingWritings();
		//then
		assertEquals(shortTypingListResDto.getContentType(), 0);
		assertEquals(shortTypingListResDto.getTypingsType(), "practice");
	}

}
