package com.project.Tamago.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDto {
	private final String accessToken;
	private final String refreshToken;
}
