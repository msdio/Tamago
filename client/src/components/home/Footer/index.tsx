import { Flex, Text } from '@chakra-ui/react';

import { TamagoLogoWhite } from '@/icons/TamagoLogoWhite';

export default function HomeFooter() {
  return (
    <Flex w='100vw' h='288px' bgColor='#000000' alignItems='center' justifyContent='center' flexDirection='column'>
      <Text fontSize='36px' fontWeight='extrabold' color='white' mb='22px'>
        개발자를 위한 코드 타이핑 연습
      </Text>
      <TamagoLogoWhite />
    </Flex>
  );
}
