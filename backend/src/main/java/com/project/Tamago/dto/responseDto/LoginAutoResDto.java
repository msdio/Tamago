package com.project.Tamago.dto.responseDto;

import com.project.Tamago.dto.LoginDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginAutoResDto implements LoginDto {
	private String accessToken;
	private String refreshToken;
	private String nickname;
}
