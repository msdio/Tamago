import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import TypingChar from '@/components/practice/long/TypingChar';
import { TypingState } from '@/types/typing';

interface TypingLineProps {
  originalLine: string;
  userLine?: string;
  states?: string;
}

function TypingLine({ originalLine, userLine, states = TypingState.EMPTY }: TypingLineProps) {
  return (
    <Flex>
      {[...originalLine].map((key, i) => (
        <TypingChar
          key={i}
          originalChar={key}
          userChar={userLine && userLine[i]}
          state={(states[i] as TypingState) ?? TypingState.DEFAULT}
        />
      ))}
    </Flex>
  );
}

export default memo(TypingLine);
