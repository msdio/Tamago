package com.project.Tamago.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Token {
	private final String accessToken;
	private final String refreshToken;
}
