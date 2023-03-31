package com.project.Tamago.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.project.Tamago.common.enums.Role;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Register;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.requestDto.LongTypingReqDto;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.security.CustomOAuth2User;

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
	@Mapping(source = "typingHistoryReqDto.typingAccuracy", target = "typingAccuracy")
	@Mapping(target = "wrongKeys", expression = "java(typingHistoryReqDto.wrongKeysChangeType())")
	@Mapping(source = "typingHistoryReqDto.contentType", target = "contentType")
	TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, LongTyping longTyping, Typing typing, User user);

	@Mapping(target = "thumbnail", expression = "java(longTypingReqDto.getContent().replaceAll(\"\\r\", \"\").substring(0, Math.min(longTypingReqDto.getContent().replaceAll(\"\\r\", \"\").length(), 50)))")
	@Mapping(target = "length", expression = "java(longTypingReqDto.getContent().replaceAll(\"\\r\", \"\").length())")
	@Mapping(target = "totalPage", expression = "java((int) Math.ceil((double) (longTypingReqDto.getContent().length() - longTypingReqDto.getContent().replaceAll(\"\\r\\n\", \"\").length() + 1) / 20))")
	LongTyping toLongTyping(LongTypingReqDto longTypingReqDto);

	@Mapping(target = "id", ignore = true)
	Register toRegister(LongTyping longTyping, Typing typing, User user);

	@Mapping(target = "provider", expression = "java(customOAuth2User.getOAuth2Id())")
	@Mapping(source = "role", target = "role")
	@Mapping(source = "nickname", target = "nickname")
	@Mapping(target = "providerId", expression = "java(customOAuth2User.getNameAttributeKey())")
	User toUser(CustomOAuth2User customOAuth2User, Role role, String nickname);
}
