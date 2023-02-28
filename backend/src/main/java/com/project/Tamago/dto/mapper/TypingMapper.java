package com.project.Tamago.dto.mapper;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.dto.ShortTypingDto;

public class TypingMapper {

	public static ShortTypingDto toShortTypingDto(Typing typing) {
		return ShortTypingDto
			.builder()
			.typingId(typing.getId())
			.content(typing.getContent())
			.build();
	}
}
