package com.project.Tamago.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.repository.TypingHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StatisticService {

	private final TypingHistoryRepository typingHistoryRepository;

	public StatisticsAllResDto totalStatisticsAll(User user) {
		List<TypingHistory> historyList = typingHistoryRepository.findAllByUser(user);
		Map<Character, Map<String, Integer>> resultMap = new HashMap<>();

		Double accuracyAverage = historyList.stream()
			.collect(Collectors.averagingDouble(TypingHistory::getTypingAccuracy));
		Double wpmAverage = historyList.stream()
			.collect(Collectors.averagingDouble(TypingHistory::getWpm));

		historyList
			.forEach(t ->
				t.getWrongKeys().forEach((key, value) -> {
					if (resultMap.containsKey(key)) {
						Map<String, Integer> map = resultMap.get(key);
						map.put("count", map.get("count") + value.get("count"));
						map.put("total", map.get("total") + value.get("total"));
					} else {
						resultMap.put(key, value);
					}
				})
			);

		Map<Character, Double> collect = resultMap.entrySet()
			.stream().collect(Collectors.toMap(
				Map.Entry::getKey,
				e -> e.getValue().get("count") / Double.valueOf(e.getValue().get("total"))
			));

		return StatisticsAllResDto.builder()
			.accuracyAverage(accuracyAverage)
			.wpmAverage(wpmAverage)
			.characterErrorMap(collect)
			.build();
	}

}
