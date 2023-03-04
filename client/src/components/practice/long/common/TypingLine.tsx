import { Flex } from '@chakra-ui/react';

import TypingChar from './TypingChar';

interface TypingLineProps {
  line: string;
  states?: string;
}

export default function TypingLine({ line, states }: TypingLineProps) {
  return (
    <Flex>
      {[...line].map((key, i) => (
        <TypingChar key={i} char={key} state={states && states[i]} />
      ))}
    </Flex>
  );
}
