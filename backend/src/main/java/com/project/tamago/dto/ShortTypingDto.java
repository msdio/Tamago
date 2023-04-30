package com.project.tamago.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShortTypingDto {

	Integer typingId;
	String content;
}
