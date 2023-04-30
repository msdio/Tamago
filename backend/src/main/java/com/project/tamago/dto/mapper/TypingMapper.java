package com.project.tamago.dto.mapper;

import com.project.tamago.domain.Typing;
import com.project.tamago.dto.ShortTypingDto;

public class TypingMapper {

	public static ShortTypingDto toShortTypingDto(Typing typing) {
		return ShortTypingDto
			.builder()
			.typingId(typing.getId())
			.content(typing.getContent())
			.build();
	}
}
