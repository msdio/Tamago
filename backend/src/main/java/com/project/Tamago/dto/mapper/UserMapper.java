package com.project.Tamago.dto.mapper;

import com.project.Tamago.domain.User;
import com.project.Tamago.dto.responseDto.ProfileResDto;

public class UserMapper {

	public static ProfileResDto convertProfileResDto(User user) {
		return new ProfileResDto(user);
	}
}
