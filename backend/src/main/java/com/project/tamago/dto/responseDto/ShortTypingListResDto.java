package com.project.tamago.dto.responseDto;

import java.util.List;

import com.project.tamago.dto.ShortTypingDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShortTypingListResDto {

	private Integer contentType;
	private String typingsType;
	private List<ShortTypingDto> typingWritings;
}
