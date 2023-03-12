import { Flex } from '@chakra-ui/react';

import type { LongTypingDetail } from '@/types/typing';

import TypingLine from '../common/TypingLine';
import PracticeLongLayout from '../Layout';

export default function LongContent({ content, currentPage, language, title, totalPage, typingId }: LongTypingDetail) {
  return (
    <PracticeLongLayout>
      <Flex direction='column' border='0.6px solid #000000' borderRadius='10px' backgroundColor='#fff' p='34px 53px'>
        {content.split('\n').map((line, i) => (
          <TypingLine key={i} contentLine={line} states={'c'.repeat(line.length)} />
        ))}
      </Flex>
    </PracticeLongLayout>
  );
}
