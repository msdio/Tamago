import { Container, Flex, Image, Text } from '@chakra-ui/react';

export default function Banner() {
  return (
    <Flex w='100vw' h='199px' bgColor='tamago.500'>
      <Container maxW='container.xl' h='100%' display='flex' alignItems='center' justifyContent='space-between'>
        <Text fontSize='2.25rem' fontWeight='extrabold' color='white'>
          이제는 개발에 재미를 더해요.
        </Text>

        <Image src='/images/home/banner-message.png' alt='banner message' w='34.3125rem' mr='1.875rem' />
      </Container>
    </Flex>
  );
}
