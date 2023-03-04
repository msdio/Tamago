import { Text } from '@chakra-ui/react';

interface TypingCharProps {
  char: string;
  status?: string;
}

export default function TypingChar({ char, status = 'd' }: TypingCharProps) {
  const charColor = (status: string) => {
    switch (status) {
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

  return (
    <Text as='span' fontFamily='D2 coding' color={charColor(status)}>
      {char}
    </Text>
  );
}
