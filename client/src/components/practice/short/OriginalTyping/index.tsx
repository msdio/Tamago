import { Flex, Text } from '@chakra-ui/react';

interface OriginalTypingProps {
  originalTyping: string;
  userTyping: string;
}

export default function OriginalTyping({ originalTyping, userTyping }: OriginalTypingProps) {
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
        if (idx < userTyping.length - 1 && word !== userTyping[idx]) {
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
