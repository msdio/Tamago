package com.project.tamago.common.enums;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum Role {

	USER("USER", "ROLE_USER"), ADMIN("ADMIN", "ROLE_ADMIN");

	private final String desc;
	private final String type;

	Role(String desc, String type) {
		this.desc = desc;
		this.type = type;
	}

	public static Role ofType(String type) {
		return Arrays.stream(Role.values())
			.filter(v -> v.getType().equals(type))
			.findAny()
			.orElseThrow(() -> new IllegalArgumentException(String.format("ROLE에 type=[%s]가 존재하지 않습니다.", type)));
	}
}