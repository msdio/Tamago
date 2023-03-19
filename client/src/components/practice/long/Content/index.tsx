import { Flex } from '@chakra-ui/react';

import type { LongTypingDetail } from '@/types/typing';
import { slicedContentAndStrings } from '@/utils/typing';

import PracticeLongLayout from '../Layout';
import TypingLine from '../TypingLine';
import TypingPagination from '../TypingPagination';

export default function LongContent({ content, currentPage, language, title, totalPage, typingId }: LongTypingDetail) {
  return (
    <PracticeLongLayout>
      <Flex
        h='550px'
        direction='column'
        border='0.6px solid #000000'
        borderRadius='10px'
        backgroundColor='#fff'
        p='34px 53px'
      >
        {slicedContentAndStrings(content).map(([line], i) => (
          <TypingLine key={i} contentLine={line} states={'c'.repeat(line.length)} />
        ))}
      </Flex>
      <Flex mt='33px' justifyContent='right'>
        <TypingPagination typingId={typingId} currentPage={currentPage} totalPage={totalPage} isTyping={false} />
      </Flex>
    </PracticeLongLayout>
  );
}
