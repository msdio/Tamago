package com.project.Tamago.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.repository.TypingHistoryRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class TypingHistoryServiceTest {

	@Autowired
	private TypingHistoryService typingHistoryService;

	@Autowired
	private TypingHistoryRepository typingHistoryRepository;

	@Test
	@DisplayName("Typing History 단건으로 저장하기")
	@Transactional
	public void getShortTyping() {
		//given
		TypingHistoryReqDto typingHistoryReqDto = TypingHistoryReqDto.builder()
			.build();
		// when
		typingHistoryService.saveHistory(typingHistoryReqDto);
		//then

	}

}
