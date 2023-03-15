package com.project.Tamago.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.project.Tamago.domain.StatisticsAll;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.repository.StatisticAllRepository;
import com.project.Tamago.repository.TypingHistoryRepository;

@SpringBootTest
@AutoConfigureMockMvc
class StatisticServiceTest {

	@Autowired
	StatisticService statisticService;
	@MockBean
	TypingHistoryRepository typingHistoryRepository;
	@MockBean
	StatisticAllRepository statisticAllRepository;

	@Test
	@Transactional
	void totalStatisticsAll() {

		// given
		User user = mock(User.class);
		StatisticsAll statisticsAllMock = mock(StatisticsAll.class);
		LocalDateTime time = LocalDateTime.MIN;
		// when
		when(statisticsAllMock.getAccuracyAverage()).thenReturn(3.14);
		when(statisticsAllMock.getUpdatedDate()).thenReturn(time);
		when(statisticsAllMock.getWpmAverage()).thenReturn(5.14);
		when(statisticsAllMock.getWrongKeyInfo()).thenReturn(Map.of('a', Map.of("count", 1, "total", 2)));
		when(statisticAllRepository.findByUser(any())).thenReturn(Optional.of(statisticsAllMock));
		when(typingHistoryRepository.findAllByUserAndCreatedDateIsAfter(user, time)).thenReturn(List.of());
		// then
		StatisticsAllResDto statisticsAllResDto = statisticService.totalStatisticsAll(user);
		assertEquals(statisticsAllResDto.getAccuracyAverage(), 3.14);
		assertEquals(statisticsAllResDto.getWpmAverage(), 5.14);
	}
}