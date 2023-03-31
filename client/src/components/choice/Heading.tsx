import { Box, Heading } from '@chakra-ui/react';

interface ChoiceHeadingProps {
  title: string;
}
export default function ChoiceHeading({ title }: ChoiceHeadingProps) {
  // TODO : text style 추가
  return (
    <Box textAlign='center' mt='136px' mb='59px'>
      <Heading as='h1' fontSize='28px' mb='10px'>
        {title}
      </Heading>
      <Heading as='h3' fontSize='19px'>
        점수를 쌓아 티어와 실력을 뽐내보세요!
      </Heading>
    </Box>
  );
}
