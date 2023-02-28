package com.project.Tamago.dto.responseDto;

import com.project.Tamago.domain.User;

import lombok.Builder;
import lombok.Data;

@Data
public class ProfileResDto {

	private String email;
	private String nickname;
	private String introduce;
	private String profileImg;
	private Boolean terms;
	private String provider;

	@Builder
	public ProfileResDto(String email, String nickname, String introduce, String profileImg, Boolean terms,
		String provider) {
		this.email = email;
		this.nickname = nickname;
		this.introduce = introduce;
		this.profileImg = profileImg;
		this.terms = terms;
		this.provider = provider;
	}

	public ProfileResDto(User user) {
		email = user.getEmail();
		nickname = user.getNickname();
		introduce = user.getIntroduce();
		profileImg = user.getProfileImg();
		terms = user.getTerms();
		provider = user.getProvider();
	}
}
