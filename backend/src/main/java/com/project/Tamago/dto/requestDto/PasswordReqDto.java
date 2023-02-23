package com.project.Tamago.dto.requestDto;

import lombok.Data;

@Data
public class PasswordReqDto {
	private String email;
	private String oldPassword;
	private String newPassword;
}