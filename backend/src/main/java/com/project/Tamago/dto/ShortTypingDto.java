package com.project.Tamago.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShortTypingDto {

	Integer typingId;
	String content;
}
