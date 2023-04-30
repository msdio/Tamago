package com.project.tamago.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageContentDto {
	private Integer page;
	private String content;
}
