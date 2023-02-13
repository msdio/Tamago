package com.project.Tamago.dto;

import javax.validation.constraints.Size;

import com.project.Tamago.domain.User;
import com.project.Tamago.util.constants.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinReqDto {

	private String email;
	private String password;
	@Size(max = 10, message = "닉네임은 10자 이하입니다.")
	private String nickname;

	public User toUser() {
		return User.builder()
			.nickname(nickname)
			.email(email)
			.role(Role.USER)
			.build();
	}
}
