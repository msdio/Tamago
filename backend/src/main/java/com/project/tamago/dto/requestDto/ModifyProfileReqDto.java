package com.project.tamago.dto.requestDto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyProfileReqDto {

	@Size(max = 20, message = "자기소개는 20자 이하입니다.")
	private String introduce;

	@NotNull
	private String profileImg;
}
