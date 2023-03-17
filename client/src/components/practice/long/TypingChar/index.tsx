import { Text } from '@chakra-ui/react';
import { memo } from 'react';

import { TypingState } from '@/types/typing';

interface TypingCharProps {
  contentChar: string;
  typingChar?: string;
  state?: TypingState;
}

function TypingChar({ contentChar, typingChar, state = TypingState.DEFAULT }: TypingCharProps) {
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

  // TODO: 컴포넌트 밖으로 빼기
  const convertBlankToVisible = (char: string) => {
    if (char === ' ' || char === '\n') return <>&nbsp;</>;
    return char;
  };

  return (
    <Text
      as='span'
      fontFamily='D2 coding'
      color={charColor(state)}
      backgroundColor={state === TypingState.FOCUS ? '#FBE789' : ''}
    >
      {state === TypingState.INCORRECT
        ? convertBlankToVisible(typingChar || contentChar)
        : convertBlankToVisible(contentChar)}
    </Text>
  );
}

export default memo(TypingChar);
