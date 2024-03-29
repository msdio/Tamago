package com.project.tamago.dto.requestDto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.project.tamago.common.enums.Role;
import com.project.tamago.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinReqDto {

	@NotBlank
	@Email(message = "이메일 형식을 지켜주세요.")
	private String email;

	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#~^*])[A-Za-z\\d!@#~^*]{8,}$", message = "패스워드 형식을 지켜주세요.")
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
