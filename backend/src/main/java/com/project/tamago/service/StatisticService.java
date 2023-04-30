package com.project.tamago.service;

import static com.project.tamago.common.enums.ResponseCode.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.ToDoubleFunction;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.tamago.common.exception.CustomException;
import com.project.tamago.domain.StatisticsAll;
import com.project.tamago.domain.TypingHistory;
import com.project.tamago.domain.User;
import com.project.tamago.dto.responseDto.DateAccuracyAverageResDto;
import com.project.tamago.dto.responseDto.DateWpmAverageResDto;
import com.project.tamago.dto.responseDto.StatisticsAllResDto;
import com.project.tamago.repository.StatisticAllRepository;
import com.project.tamago.repository.TypingHistoryRepository;
import com.project.tamago.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StatisticService {

	private final TypingHistoryRepository typingHistoryRepository;
	private final StatisticAllRepository statisticAllRepository;
	private final UserRepository userRepository;

	public StatisticsAllResDto totalStatisticsAll(Integer userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USERS_INFO_NOT_EXISTS));
		Optional<StatisticsAll> optionalStatisticsAll = statisticAllRepository.findByUser(user);
		if (optionalStatisticsAll.isPresent()) {
			return getStatisticsAllResDto(changeStatisticsAll(user, optionalStatisticsAll.get()));
		}
		return getStatisticsAllResDto(getFirstStatisticsAll(user));
	}

	public DateAccuracyAverageResDto findAccuracyAverageByUser(Integer userId, LocalDate startDay, LocalDate endDay) {
		return new DateAccuracyAverageResDto(typingHistoryRepository.findAccuracyAverageByUserId(userId, startDay.atStartOfDay(), endDay.atStartOfDay()));
	}

	public DateWpmAverageResDto findWpmAverageByUser(Integer userId, LocalDate startDay, LocalDate endDay) {
		return new DateWpmAverageResDto(typingHistoryRepository.findWpmAverageByUserId(userId, startDay.atStartOfDay(), endDay.atStartOfDay()));
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
		statisticsAll.updateStatisticsAll(getDoubleAverage(afterHistoryList, TypingHistory::getTypingAccuracy),
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
			.size(length)
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
		ToDoubleFunction<TypingHistory> getDoubleFunction) {
		return historyList.stream()
			.mapToDouble(getDoubleFunction)
			.average()
			.orElse(0.0);
	}

}
