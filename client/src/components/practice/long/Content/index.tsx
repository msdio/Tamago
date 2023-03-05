import { Flex } from '@chakra-ui/react';

import TypingLine from '../common/TypingLine';
import PracticeLongLayout from '../Layout';

interface LongContentProps {
  title: string;
  content: string;
  currPage: number;
  totalPage: number;
}

export default function LongContent({ title, content, currPage, totalPage }: LongContentProps) {
  return (
    <PracticeLongLayout>
      <Flex
        direction='column'
        h='390px'
        border='0.6px solid #000000'
        borderRadius='10px'
        backgroundColor='#fff'
        p='34px 53px'
      >
        {content.split('\n').map((line, i) => (
          <TypingLine key={i} contentLine={line} states={'c'.repeat(line.length)} />
        ))}
      </Flex>
    </PracticeLongLayout>
  );
}
