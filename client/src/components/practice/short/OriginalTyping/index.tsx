import { Flex, Text } from '@chakra-ui/react';

interface OriginalTypingProps {
  originalTyping: string;
  userTyping: string;

  isTyping?: boolean;
}

export default function OriginalTyping({ originalTyping, userTyping, isTyping }: OriginalTypingProps) {
  return (
    <Flex pl='5px' mb='10px' fontSize='23px' fontWeight={500}>
      {originalTyping.split('').map((word, idx) => {
        if (word === ' ') {
          return (
            <Text as='span' key={idx}>
              &nbsp;
            </Text>
          );
        }
        const isErrorWord = isTyping
          ? idx < userTyping.length - 1 && word !== userTyping[idx]
          : idx < userTyping.length && word !== userTyping[idx];

        if (isErrorWord) {
          return (
            <Text as='span' bg='red' color='#fff' key={idx}>
              {word}
            </Text>
          );
        }
        return (
          <Text as='span' key={idx}>
            {word}
          </Text>
        );
      })}
    </Flex>
  );
}
