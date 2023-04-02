package com.project.Tamago.dto.responseDto;

import java.util.List;

import com.project.Tamago.dto.LongTypingDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LongTypingResDto {
	private Integer totalPage;
	private List<LongTypingDto> longTypings;
}
