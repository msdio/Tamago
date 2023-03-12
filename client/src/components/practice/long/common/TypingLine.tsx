import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import type { TypingState } from '@/types/typing';

import TypingChar from './TypingChar';

interface TypingLineProps {
  contentLine: string;
  typingLine?: string;
  states?: string;
}

function TypingLine({ contentLine, typingLine, states = '' }: TypingLineProps) {
  return (
    <Flex>
      {[...contentLine].map((key, i) => (
        <TypingChar
          key={i}
          contentChar={key}
          typingChar={typingLine && typingLine[i]}
          state={(states[i] as TypingState) ?? 'd'}
        />
      ))}
    </Flex>
  );
}

export default memo(TypingLine);
