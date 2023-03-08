import { Text } from '@chakra-ui/react';
import { memo } from 'react';

import type { TypingState } from '@/types/typing';

interface TypingCharProps {
  contentChar: string;
  typingChar?: string;
  state?: TypingState;
}

function TypingChar({ contentChar, typingChar, state = 'd' }: TypingCharProps) {
  const charColor = (state: TypingState) => {
    switch (state) {
      case 'c':
        return 'black';
      case 'i' as unknown as TypingState:
        return '#ff0000';
      case 'u' as unknown as TypingState:
        return '#ff6A3C';
      default:
        return '#757575';
    }
  };

  const convertBlankToVisible = (char: string) => {
    if (char === ' ' || char === '\n') return <>&nbsp;</>;
    return char;
  };

  return (
    <Text as='span' fontFamily='D2 coding' color={charColor(state)} backgroundColor={state === 'f' ? '#FBE789' : ''}>
      {state === 'i' ? convertBlankToVisible(typingChar || contentChar) : convertBlankToVisible(contentChar)}
    </Text>
  );
}

export default memo(TypingChar);
