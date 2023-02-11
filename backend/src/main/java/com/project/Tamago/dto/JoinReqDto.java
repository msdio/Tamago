package com.project.Tamago.dto;

import com.project.Tamago.domain.User;
import com.project.Tamago.util.constants.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinReqDto {

	private String email;
	private String password;
	private String nickname;

	public User toUser() {
		return User.builder()
			.nickname(nickname)
			.email(email)
			.role(Role.USER)
			.build();
	}
}
