import { Text } from '@chakra-ui/react';

interface TypingCharProps {
  char: string;
}

export default function TypingChar({ char }: TypingCharProps) {
  return (
    <Text as='span' fontFamily='D2 coding'>
      {char}
    </Text>
  );
}
