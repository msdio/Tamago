package com.project.Tamago.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
public enum Role {

    USER("유저", "ROLE_USER"), ADMIN("관리자", "ROLE_ADMIN");

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