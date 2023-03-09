package com.project.Tamago.dto.mapper;

import com.project.Tamago.constants.enums.Mode;
import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.domain.Typing;
import com.project.Tamago.domain.TypingHistory;
import com.project.Tamago.domain.TypingHistory.TypingHistoryBuilder;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.requestDto.TypingHistoryReqDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto.LongTypingResDtoBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-09T22:41:32+0900",
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
    public TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, Typing typing, User user) {
        if ( typingHistoryReqDto == null && typing == null && user == null ) {
            return null;
        }

        TypingHistoryBuilder typingHistory = TypingHistory.builder();

        if ( typingHistoryReqDto != null ) {
            typingHistory.wpm( typingHistoryReqDto.getWpm() );
            if ( typingHistoryReqDto.getMode() != null ) {
                typingHistory.mode( Enum.valueOf( Mode.class, typingHistoryReqDto.getMode() ) );
            }
            typingHistory.startTime( typingHistoryReqDto.getStartTime() );
            typingHistory.endTime( typingHistoryReqDto.getEndTime() );
        }
        if ( typing != null ) {
            typingHistory.typing( typing );
            typingHistory.contentType( typing.getContentType() );
        }
        if ( user != null ) {
            typingHistory.user( user );
        }

        return typingHistory.build();
    }
}
