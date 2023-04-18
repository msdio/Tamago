import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import TypingChar from '@/components/typing/long/TypingChar';
import { TYPING_STATE } from '@/constants/typing';

interface TypingLineProps {
  originalLine: string;
  userLine?: string;
  states?: string;
}

function TypingLine({ originalLine, userLine, states = TYPING_STATE.EMPTY }: TypingLineProps) {
  return (
    <Flex>
      {[...originalLine].map((key, i) => (
        <TypingChar
          key={i}
          originalChar={key}
          userChar={userLine && userLine[i]}
          state={(states[i] as TYPING_STATE) ?? TYPING_STATE.DEFAULT}
        />
      ))}
    </Flex>
  );
}

export default memo(TypingLine);
