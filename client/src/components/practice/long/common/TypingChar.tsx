import { Text } from '@chakra-ui/react';

interface TypingCharProps {
  contentChar: string;
  typingChar?: string;
  state?: string;
}

export default function TypingChar({ contentChar, typingChar, state }: TypingCharProps) {
  const charColor = (state: string | undefined) => {
    switch (state) {
      case 'c':
        return 'black';
      case 'i':
        return '#ff0000';
      case 'u':
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
    <Text as='span' fontFamily='D2 coding' color={charColor(state)}>
      {state === 'i' || state === 'u'
        ? convertBlankToVisible(typingChar || contentChar)
        : convertBlankToVisible(contentChar)}
    </Text>
  );
}
