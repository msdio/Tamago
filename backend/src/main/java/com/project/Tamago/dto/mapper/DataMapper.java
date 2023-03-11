package com.project.Tamago.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;

@Mapper(componentModel = "spring")
public interface DataMapper {

	DataMapper INSTANCE = Mappers.getMapper(DataMapper.class);

	@Mapping(source = "id", target = "typingId")
	@Mapping(target = "language", expression = "java(longTyping.getLanguage().toString())")
	LongTypingResDto LongTypingToLongTypingResDto(LongTyping longTyping);

	@Mapping(source = "longTyping.id", target = "typingId")
	@Mapping(target = "language", expression = "java(longTyping.getLanguage().toString())")
	@Mapping(source = "pageContentDto.content", target = "content")
	@Mapping(source = "pageContentDto.page", target = "currentPage")
	LongTypingDetailResDto LongTypingToLongTypingDetailResDto(LongTyping longTyping, PageContentDto pageContentDto);

	@Mapping(target = "id", ignore = true)
	@Mapping(source = "typing", target = "typing")
	@Mapping(source = "user", target = "user")
	TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, Typing typing, User user);
}
