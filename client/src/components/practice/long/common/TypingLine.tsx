import { Flex } from '@chakra-ui/react';

import TypingChar from './TypingChar';

interface TypingLineProps {
  contentLine: string;
  typingLine?: string;
  states?: string;
}

export default function TypingLine({ contentLine, typingLine, states }: TypingLineProps) {
  return (
    <Flex>
      {[...contentLine].map((key, i) => (
        <TypingChar key={i} contentChar={key} typingChar={typingLine && typingLine[i]} state={states && states[i]} />
      ))}
    </Flex>
  );
}
