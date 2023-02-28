package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.dto.ShortTypingDto;
import com.project.Tamago.dto.responseDto.ShortTypingListResDto;
import com.project.Tamago.repository.TypingRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class ShortTypingServiceTest {
	Logger log = (Logger) LoggerFactory.getLogger(ShortTypingServiceTest.class);
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
		// given
		makeTypings();
		// when
		ShortTypingListResDto shortTypingListResDto = shortTypingService.findRandomShortTyping();
		List<ShortTypingDto> shortTypingList = shortTypingListResDto.getTypingWritings();
		// then

		assertEquals(shortTypingListResDto.getContentType(), 0);
		assertEquals(shortTypingListResDto.getTypingsType(), "practice");
		log.info(shortTypingList.get(0).toString());
		log.info(shortTypingDto.toString());
		assertEquals(shortTypingList.get(0), shortTypingDto);
	}

}
