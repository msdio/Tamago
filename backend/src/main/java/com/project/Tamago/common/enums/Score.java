package com.project.Tamago.common.enums;

import lombok.Getter;

@Getter
public enum Score {
	TIER_2_DIFF(20),
	TIER_1_DIFF(10),
	PENALTY(5),
	SAME_TIER(15);

	private final int score;

	Score(int score) {
		this.score = score;
	}
}
