import { Flex, Text } from '@chakra-ui/react';

import { TamagoLogoWhite } from '@/icons/TamagoLogoWhite';

export default function HomeFooter() {
  return (
    <Flex w='100%' h='288px' bgColor='black.dark' alignItems='center' justifyContent='center' flexDirection='column'>
      <Text fontSize='1.875rem' fontWeight='extrabold' color='white.light' mb='1.9375rem'>
        개발자를 위한 코드 타이핑 연습
      </Text>
      <TamagoLogoWhite />
    </Flex>
  );
}
