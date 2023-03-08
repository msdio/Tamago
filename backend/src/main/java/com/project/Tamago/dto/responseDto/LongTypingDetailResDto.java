package com.project.Tamago.dto.responseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LongTypingDetailResDto {
	private Integer typingId;
	private String title;
	private String content;
	private String language;
	private Integer currentPage;
	private Integer totalPage;
}
