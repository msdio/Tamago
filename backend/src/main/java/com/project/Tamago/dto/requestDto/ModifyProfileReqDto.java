package com.project.Tamago.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyProfileReqDto {
	private String introduce;
	private String profileImg;
}
