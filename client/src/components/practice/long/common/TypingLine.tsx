import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import TypingChar from './TypingChar';

interface TypingLineProps {
  contentLine: string;
  typingLine?: string;
  states?: string;
}

function TypingLine({ contentLine, typingLine, states }: TypingLineProps) {
  return (
    <Flex>
      {[...contentLine].map((key, i) => (
        <TypingChar key={i} contentChar={key} typingChar={typingLine && typingLine[i]} state={states && states[i]} />
      ))}
    </Flex>
  );
}

export default memo(TypingLine);
