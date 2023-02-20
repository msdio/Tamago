package com.project.Tamago.dto.responseDto;

import com.project.Tamago.dto.SuccessMessage;

import lombok.Data;

@Data
public class LoginResDto extends SuccessMessage {
	private final String accessToken;
}
