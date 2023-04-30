package com.project.tamago.common.enums;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Level {
	LEVEL_1(0, 360, 1),
	LEVEL_2(361, 630, 2),
	LEVEL_3(631, 810, 3),
	LEVEL_4(811, 900, 4),
	LEVEL_5(901, Integer.MAX_VALUE, 5);

	private final int minMmr;
	private final int maxMmr;
	private final int level;

	public static Level of(int mmr) {
		return Arrays.stream(Level.values())
			.filter(level -> mmr >= level.minMmr && mmr <= level.maxMmr)
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException("Invalid MMR: " + mmr));
	}
}
