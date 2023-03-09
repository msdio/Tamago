package com.project.Tamago.service;

import static org.mockito.Mockito.*;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.repository.TypingHistoryRepository;
import com.project.Tamago.util.TypingHistoryGenerator;

@SpringBootTest
@AutoConfigureMockMvc
class StatisticServiceTest {

	@Autowired
	StatisticService statisticService;
	@Autowired
	TypingHistoryRepository typingHistoryRepository;

	@Test
	@Transactional
	@Rollback(value = false)
	void test() {
		ArrayList<TypingHistory> histories = new ArrayList<>();
		for (int i = 0; i < 100000; i++) {
			histories.add(TypingHistoryGenerator.generateRandomTypingHistory());
		}
		typingHistoryRepository.saveAll(histories);
	}


	@Test
	@Transactional
	void totalStatisticsAll() {

		// given
		User user = mock(User.class);
		User build = User.builder()
			.id(1)
			.build();

		// when
		when(user.getId()).thenReturn(1);

		// then
		StatisticsAllResDto statisticsAllResDto = statisticService.totalStatisticsAll(build);
		System.out.println("statisticsAllResDto.getAccuracyAverage() = " + statisticsAllResDto.getAccuracyAverage());
		System.out.println("statisticsAllResDto.getWpmAverage() = " + statisticsAllResDto.getWpmAverage());
		System.out.println("statisticsAllResDto.getCharacterErrorMap() = " + statisticsAllResDto.getCharacterErrorMap());
	}
}