package com.project.tamago.dto.mapper;

import com.project.tamago.domain.User;
import com.project.tamago.dto.responseDto.ProfileResDto;

public class UserMapper {

	public static ProfileResDto convertProfileResDto(User user){
		return ProfileResDto.builder()
			.profileImg(user.getProfileImg())
			.terms(user.getTerms())
			.introduce(user.getIntroduce())
			.email(user.getEmail())
			.nickname(user.getNickname())
			.provider(user.getProvider())
			.build();
	}
}
