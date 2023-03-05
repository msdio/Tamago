package com.project.Tamago.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.responseDto.LongTypingResDto;

@Mapper(componentModel = "spring")
public interface DataMapper {

	DataMapper INSTANCE = Mappers.getMapper(DataMapper.class);

	@Mapping(source = "id", target = "typingId")
	@Mapping(target = "language", expression = "java(longTyping.getLanguage().toString())")
	LongTypingResDto LongTypingToLongTypingResDto(LongTyping longTyping);

}
