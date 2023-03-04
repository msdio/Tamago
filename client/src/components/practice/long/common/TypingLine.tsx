import { Flex } from '@chakra-ui/react';

import TypingChar from './TypingChar';

interface TypingLineProps {
  line: string;
}

export default function TypingLine({ line }: TypingLineProps) {
  return (
    <Flex>
      {[...line].map((key, index) => (
        <TypingChar key={index} char={key} />
      ))}
    </Flex>
  );
}
