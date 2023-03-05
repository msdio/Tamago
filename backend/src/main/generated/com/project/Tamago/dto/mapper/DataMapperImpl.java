package com.project.Tamago.dto.mapper;

import com.project.Tamago.domain.LongTyping;
import com.project.Tamago.dto.responseDto.LongTypingResDto;
import com.project.Tamago.dto.responseDto.LongTypingResDto.LongTypingResDtoBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-06T00:33:52+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Eclipse Adoptium)"
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
}
