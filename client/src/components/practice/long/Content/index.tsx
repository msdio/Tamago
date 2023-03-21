import { Flex } from '@chakra-ui/react';

import PracticeLongLayout from '@/components/practice/long/Layout';
import TypingLine from '@/components/practice/long/TypingLine';
import type { LongTypingDetail } from '@/types/typing';
import { slicedContentAndStrings } from '@/utils/typing';

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
    </PracticeLongLayout>
  );
}
