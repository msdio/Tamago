package com.project.Tamago.util;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import com.project.Tamago.constants.enums.Mode;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;

public class TypingHistoryGenerator {
	private static final Random random = new Random();

	public static TypingHistory generateRandomTypingHistory() {
		Typing typing = Typing.builder()
			.id(random.nextInt(500) + 1).build();
		User user = User.builder()
			.id(random.nextInt(5000) + 1).build();

		Integer wpm = random.nextInt(1000);
		Double accuracy = random.nextDouble() * 100;
		Boolean contentType = random.nextBoolean();
		Mode mode = Mode.values()[random.nextInt(Mode.values().length)];
		LocalDateTime startTime = LocalDateTime.now().minusMinutes(random.nextInt(60));
		LocalDateTime endTime = startTime.plusMinutes(random.nextInt(60));
		Integer beforeMmr = random.nextInt(5000);
		Integer increasedValue = random.nextInt(100);

		Map<Character, Map<String, Integer>> wrongKeys = new HashMap<>();
		for (char c = 'a'; c <= 'z'; c++) {
			if (random.nextInt(100) % 2 == 1) {
				continue;
			}
			Map<String, Integer> mistakes = new HashMap<>();
			mistakes.put("total", random.nextInt(5) + 5);
			mistakes.put("count", random.nextInt(5));
			wrongKeys.put(c, mistakes);
		}

		return TypingHistory.builder()
			.user(user)
			.typing(typing)
			.wpm(wpm)
			.typingAccuracy(accuracy)
			.contentType(contentType)
			.mode(mode)
			.startTime(startTime)
			.endTime(endTime)
			.beforeMmr(beforeMmr)
			.increasedValue(increasedValue)
			.wrongKeys(wrongKeys)
			.build();
	}
}