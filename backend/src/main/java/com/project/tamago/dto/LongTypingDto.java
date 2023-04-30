package com.project.tamago.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LongTypingDto {
	private Integer typingId;
	private String title;
	private String thumbnail;
	private String language;
	private String totalPage;
	private Integer viewCount;
}
