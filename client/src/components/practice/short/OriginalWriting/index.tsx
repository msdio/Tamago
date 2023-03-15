import { Flex, Text } from '@chakra-ui/react';

interface OriginalWritingProps {
  originalWriting: string;
  inputWriting: string;
}

export default function OriginalWriting({ originalWriting, inputWriting }: OriginalWritingProps) {
  return (
    <Flex pl='5px' mb='10px' fontSize='23px' fontWeight={500}>
      {originalWriting.split('').map((word, idx) => {
        if (word === ' ') {
          return (
            <Text as='span' key={idx}>
              &nbsp;
            </Text>
          );
        }
        if (idx < inputWriting.length - 1 && word !== inputWriting[idx]) {
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
