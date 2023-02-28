package com.project.Tamago.dto.mapper;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.ProfileResDto;

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
