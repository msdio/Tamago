package com.project.Tamago.dto.responseDto;

import java.util.List;

import com.project.Tamago.dto.ShortTypingDto;

import lombok.Data;

@Data
public class ShortTypingListResDto {

	private Integer contentType;
	private String typingsType;
	private List<ShortTypingDto> typingWritings;
}
