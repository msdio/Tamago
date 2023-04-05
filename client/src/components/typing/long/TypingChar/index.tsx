import { Text } from '@chakra-ui/react';
import { memo } from 'react';

import { TYPING_STATE } from '@/constants/typing';

const convertBlankToVisible = (char: string) => {
  if (char === ' ' || char === '\n') return <>&nbsp;</>;
  return char;
};

const charColor = (state: TYPING_STATE) => {
  switch (state) {
    case TYPING_STATE.CORRECT:
      return 'black';
    case TYPING_STATE.INCORRECT:
      return '#ff0000';
    default:
      return '#757575';
  }
};

interface TypingCharProps {
  originalChar: string;
  userChar?: string;
  state?: TYPING_STATE;
}

function TypingChar({ originalChar, userChar, state = TYPING_STATE.DEFAULT }: TypingCharProps) {
  return (
    <Text
      as='span'
      fontFamily='D2 coding'
      color={charColor(state)}
      backgroundColor={state === TYPING_STATE.FOCUS ? '#FBE789' : ''}
    >
      {state === TYPING_STATE.INCORRECT
        ? convertBlankToVisible(userChar || originalChar)
        : convertBlankToVisible(originalChar)}
    </Text>
  );
}

export default memo(TypingChar);
