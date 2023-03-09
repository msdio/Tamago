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
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-10T05:04:21+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.12 (Eclipse Foundation)"
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
    public TypingHistory toTypingHistory(TypingHistoryReqDto typingHistoryReqDto, Typing typing, User user, Map<Character, Map<String, Integer>> wrongKeys) {
        if ( typingHistoryReqDto == null && typing == null && user == null && wrongKeys == null ) {
            return null;
        }

        TypingHistoryBuilder typingHistory = TypingHistory.builder();

        if ( typingHistoryReqDto != null ) {
            typingHistory.wpm( typingHistoryReqDto.getWpm() );
            typingHistory.typingAccuracy( (double) typingHistoryReqDto.getTypingAccuracy() );
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
        if ( wrongKeys != null ) {
            Map<Character, Map<String, Integer>> map = wrongKeys;
            if ( map != null ) {
                typingHistory.wrongKeys( new HashMap<Character, Map<String, Integer>>( map ) );
            }
        }

        return typingHistory.build();
    }
}
