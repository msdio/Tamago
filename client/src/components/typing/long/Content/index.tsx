import { Flex } from '@chakra-ui/react';

import PracticeLongLayout from '@/components/typing/long/Layout';
import TypingDetailPagination from '@/components/typing/long/TypingDetailPagination';
import TypingExit from '@/components/typing/long/TypingExit';
import TypingLine from '@/components/typing/long/TypingLine';
import type { LongTypingDetail } from '@/types/typing';
import { slicedContentAndStrings } from '@/utils/typing';

export default function LongContent({ content, currentPage, language, title, totalPage, typingId }: LongTypingDetail) {
  return (
    <PracticeLongLayout>
      <Flex mb='21px' justifyContent='right'>
        <TypingExit />
      </Flex>
      <Flex
        h='550px'
        direction='column'
        border='0.6px solid #000000'
        borderRadius='10px'
        backgroundColor='#fff'
        p='34px 53px'
      >
        {slicedContentAndStrings(content).map(([line], i) => (
          <TypingLine key={i} originalLine={line} states={'c'.repeat(line.length)} />
        ))}
      </Flex>
      <Flex mt='33px' justifyContent='right'>
        <TypingDetailPagination typingId={typingId} currentPage={currentPage} totalPage={totalPage} isTyping={false} />
      </Flex>
    </PracticeLongLayout>
  );
}