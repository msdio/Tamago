package com.project.Tamago.dto.responseDto;

import com.project.Tamago.dto.LoginInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginAutoResInfoDto implements LoginInfoDto {
	private String accessToken;
	private String refreshToken;
	private String nickname;
}
