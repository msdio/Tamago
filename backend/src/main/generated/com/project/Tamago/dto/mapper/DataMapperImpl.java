package com.project.Tamago.dto.mapper;

import com.project.Tamago.common.enums.Mode;
import com.project.Tamago.common.enums.Role;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.TypingHistory.TypingHistoryBuilder;
import com.project.Tamago.domain.User;
import com.project.Tamago.domain.User.UserBuilder;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto;
import com.project.Tamago.dto.responseDto.LongTypingDetailResDto.LongTypingDetailResDtoBuilder;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto.LongTypingResDtoBuilder;
import com.project.Tamago.security.CustomOAuth2User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-27T02:39:40+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.16 (Eclipse Adoptium)"
)
@Component
public class DataMapperImpl implements DataMapper {

    @Override
    public LongTypingResDto LongTypingToLongTypingResDto(LongTyping longTyping) {
        if ( longTyping == null ) {
            return null;
        }

        LongTypingResDtoBuilder longTypingResDto = LongTypingResDto.builder();

        longTypingResDto.typingId( longTyping.getId() );
        longTypingResDto.title( longTyping.getTitle() );
        longTypingResDto.thumbnail( longTyping.getThumbnail() );
        if ( longTyping.getTotalPage() != null ) {
            longTypingResDto.totalPage( String.valueOf( longTyping.getTotalPage() ) );
        }
        longTypingResDto.viewCount( longTyping.getViewCount() );

        longTypingResDto.language( longTyping.getLanguage().toString() );

        return longTypingResDto.build();
    }

    @Override
    public LongTypingDetailResDto LongTypingToLongTypingDetailResDto(LongTyping longTyping, PageContentDto pageContentDto) {
        if ( longTyping == null && pageContentDto == null ) {
            return null;
        }

        LongTypingDetailResDtoBuilder longTypingDetailResDto = LongTypingDetailResDto.builder();

        if ( longTyping != null ) {
            longTypingDetailResDto.typingId( longTyping.getId() );
            longTypingDetailResDto.title( longTyping.getTitle() );
            longTypingDetailResDto.totalPage( longTyping.getTotalPage() );
        }
        if ( pageContentDto != null ) {
            longTypingDetailResDto.content( pageContentDto.getContent() );
            longTypingDetailResDto.currentPage( pageContentDto.getPage() );
        }
        longTypingDetailResDto.language( longTyping.getLanguage().toString() );

        return longTypingDetailResDto.build();
    }

    @Override
    public TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, LongTyping longTyping, Typing typing, User user) {
        if ( typingHistoryReqDto == null && longTyping == null && typing == null && user == null ) {
            return null;
        }

        TypingHistoryBuilder typingHistory = TypingHistory.builder();

        if ( typingHistoryReqDto != null ) {
            if ( typingHistoryReqDto.getTypingAccuracy() != null ) {
                typingHistory.typingAccuracy( typingHistoryReqDto.getTypingAccuracy().doubleValue() );
            }
            typingHistory.contentType( typingHistoryReqDto.getContentType() );
            typingHistory.wpm( typingHistoryReqDto.getWpm() );
            if ( typingHistoryReqDto.getMode() != null ) {
                typingHistory.mode( Enum.valueOf( Mode.class, typingHistoryReqDto.getMode() ) );
            }
            typingHistory.startTime( typingHistoryReqDto.getStartTime() );
            typingHistory.endTime( typingHistoryReqDto.getEndTime() );
            typingHistory.page( typingHistoryReqDto.getPage() );
        }
        if ( longTyping != null ) {
            typingHistory.longTyping( longTyping );
        }
        if ( typing != null ) {
            typingHistory.typing( typing );
        }
        if ( user != null ) {
            typingHistory.user( user );
        }
        typingHistory.wrongKeys( typingHistoryReqDto.wrongKeysChangeType() );

        return typingHistory.build();
    }

    @Override
    public User toUser(CustomOAuth2User customOAuth2User, Role role, String nickname) {
        if ( customOAuth2User == null && role == null && nickname == null ) {
            return null;
        }

        UserBuilder user = User.builder();

        if ( customOAuth2User != null ) {
            user.email( customOAuth2User.getEmail() );
        }
        if ( role != null ) {
            user.role( role );
        }
        if ( nickname != null ) {
            user.nickname( nickname );
        }
        user.provider( customOAuth2User.getOAuth2Id() );
        user.providerId( customOAuth2User.getNameAttributeKey() );

        return user.build();
    }
}
