package com.project.tamago.dto.responseDto;

import java.util.List;

import com.project.tamago.dto.LongTypingDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LongTypingResDto {
	private Integer totalPage;
	private List<LongTypingDto> longTypings;
}
