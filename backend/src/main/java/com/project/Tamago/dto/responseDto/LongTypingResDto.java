package com.project.Tamago.dto.responseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LongTypingResDto {
	private Integer typingId;
	private String title;
	private String thumbnail;
	private String language;
	private String totalPage;
	private Integer viewCount;
}
