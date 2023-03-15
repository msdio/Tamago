package com.project.Tamago.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.ToDoubleFunction;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Tamago.domain.StatisticsAll;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.repository.StatisticAllRepository;
import com.project.Tamago.repository.TypingHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StatisticService {

	private final TypingHistoryRepository typingHistoryRepository;
	private final StatisticAllRepository statisticAllRepository;

	public StatisticsAllResDto totalStatisticsAll(User user) {
		Optional<StatisticsAll> optionalStatisticsAll = statisticAllRepository.findByUser(user);
		if (optionalStatisticsAll.isPresent()) {
			return getStatisticsAllResDto(changeStatisticsAll(user, optionalStatisticsAll.get()));
		}
		return getStatisticsAllResDto(getFirstStatisticsAll(user));
	}

	private StatisticsAll changeStatisticsAll(User user, StatisticsAll statisticsAll) {
		List<TypingHistory> afterHistoryList = typingHistoryRepository.findAllByUserAndCreatedDateIsAfter(
			user, statisticsAll.getUpdatedDate());

		Map<Character, Map<String, Integer>> wrongKeyInfo = statisticsAll.getWrongKeyInfo();
		Map<Character, Map<String, Integer>> characterInfoMap = getAllWrongKeyInfoMap(afterHistoryList);
		characterInfoMap.forEach((key, value) -> {
			Map<String, Integer> stringIntegerMap = wrongKeyInfo.get(key);
			stringIntegerMap.put("count", stringIntegerMap.get("count") + value.get("count"));
			stringIntegerMap.put("total", stringIntegerMap.get("total") + value.get("total"));
		});
		statisticsAll.changeStatisticsAll(getDoubleAverage(afterHistoryList, TypingHistory::getTypingAccuracy),
			getDoubleAverage(afterHistoryList, TypingHistory::getWpm), afterHistoryList.size());
		return statisticsAll;
	}

	private StatisticsAll getFirstStatisticsAll(User user) {
		List<TypingHistory> historyList = typingHistoryRepository.findAllByUser(user);
		double accuracyAverage = getDoubleAverage(historyList, TypingHistory::getTypingAccuracy);
		double wpmAverage = getDoubleAverage(historyList, TypingHistory::getWpm);
		int length = historyList.size();
		Map<Character, Map<String, Integer>> allWrongKeyInfoMap = getAllWrongKeyInfoMap(historyList);
		return saveStatisticAllEntity(accuracyAverage, wpmAverage, length, allWrongKeyInfoMap,
			user);
	}

	private StatisticsAllResDto getStatisticsAllResDto(StatisticsAll statisticsAll) {
		return StatisticsAllResDto.builder()
			.accuracyAverage(statisticsAll.getAccuracyAverage())
			.wpmAverage(statisticsAll.getWpmAverage())
			.characterErrorMap(getWrongKeyAverage(statisticsAll.getWrongKeyInfo()))
			.build();
	}

	private StatisticsAll saveStatisticAllEntity(double accuracyAverage, double wpmAverage, int length,
		Map<Character, Map<String, Integer>> wrongKeyAverage, User user) {
		StatisticsAll statisticsAll = StatisticsAll.builder()
			.accuracyAverage(accuracyAverage)
			.wpmAverage(wpmAverage)
			.length(length)
			.wrongKeyInfo(wrongKeyAverage)
			.user(user)
			.build();
		statisticAllRepository.save(statisticsAll);
		return statisticsAll;
	}

	private Map<Character, Double> getWrongKeyAverage(Map<Character, Map<String, Integer>> characterInfoMap) {
		return characterInfoMap
			.entrySet().stream()
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				entry -> entry.getValue().get("count") / (double)entry.getValue().get("total")
			));
	}

	private Map<Character, Map<String, Integer>> getAllWrongKeyInfoMap(List<TypingHistory> historyList) {
		return historyList.stream()
			.flatMap(history -> history.getWrongKeys().entrySet().stream())
			.collect(Collectors.groupingBy(
				Map.Entry::getKey,
				Collectors.reducing(
					Map.of("count", 0, "total", 0),
					entry -> Map.of("count", entry.getValue().get("count"), "total", entry.getValue().get("total")),
					(map1, map2) -> Map.of(
						"count", map1.get("count") + map2.get("count"),
						"total", map1.get("total") + map2.get("total")
					)
				)
			));
	}

	private double getDoubleAverage(List<TypingHistory> historyList,
		ToDoubleFunction<TypingHistory> getTypingAccuracy) {
		return historyList.stream()
			.mapToDouble(getTypingAccuracy)
			.average()
			.orElse(0.0);
	}

}
