package com.project.Tamago.dto.mapper;

import java.util.Map;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;

@Mapper(componentModel = "spring")
public interface DataMapper {

	DataMapper INSTANCE = Mappers.getMapper(DataMapper.class);

	@Mapping(source = "id", target = "typingId")
	@Mapping(target = "language", expression = "java(longTyping.getLanguage().toString())")
	LongTypingResDto LongTypingToLongTypingResDto(LongTyping longTyping);

	@Mapping(target = "id", ignore = true)
	@Mapping(source = "typing", target = "typing")
	@Mapping(source = "user", target = "user")
	@Mapping(source = "wrongKeys", target = "wrongKeys")
	TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, Typing typing, User user, Map<Character, Map<String,Integer>> wrongKeys);
}
