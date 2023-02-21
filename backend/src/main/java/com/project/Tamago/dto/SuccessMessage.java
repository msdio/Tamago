package com.project.Tamago.dto;

import lombok.Data;

@Data
public class SuccessMessage {
	private int code = 1000;
	private String description = "응답 성공";
}
