package com.project.Tamago.dto.responseDto;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.SuccessResDto;

import lombok.Data;

@Data
public class ProfileResDto extends SuccessResDto {

	private String email;
	private String nickname;
	private String introduce;
	private String profileImg;
	private Boolean terms;
	private String provider;

	public ProfileResDto(User user) {
		email = user.getEmail();
		nickname = user.getNickname();
		introduce = user.getIntroduce();
		profileImg = user.getProfileImg();
		terms = user.getTerms();
		provider = user.getProvider();
	}
}
