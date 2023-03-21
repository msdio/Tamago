import { Text } from '@chakra-ui/react';
import { memo } from 'react';

import { TypingState } from '@/types/typing';

const convertBlankToVisible = (char: string) => {
  if (char === ' ' || char === '\n') return <>&nbsp;</>;
  return char;
};

const charColor = (state: TypingState) => {
  switch (state) {
    case TypingState.CORRECT:
      return 'black';
    case TypingState.INCORRECT:
      return '#ff0000';
    default:
      return '#757575';
  }
};

interface TypingCharProps {
  originalChar: string;
  userChar?: string;
  state?: TypingState;
}

function TypingChar({ originalChar, userChar, state = TypingState.DEFAULT }: TypingCharProps) {
  return (
    <Text
      as='span'
      fontFamily='D2 coding'
      color={charColor(state)}
      backgroundColor={state === TypingState.FOCUS ? '#FBE789' : ''}
    >
      {state === TypingState.INCORRECT
        ? convertBlankToVisible(userChar || originalChar)
        : convertBlankToVisible(originalChar)}
    </Text>
  );
}

export default memo(TypingChar);
