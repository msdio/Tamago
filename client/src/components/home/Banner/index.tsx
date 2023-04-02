import { Container, Flex, Image, Text } from '@chakra-ui/react';

export default function Banner() {
  return (
    <Flex w='100%' h='199px' bgColor='primary.main'>
      <Container maxW='container.xl' h='100%' display='flex' alignItems='center' justifyContent='space-between'>
        <Text fontSize='1.875rem' fontWeight='700' color='white.light' marginLeft='2.0625rem'>
          이제는 개발에 재미를 더해요.
        </Text>

        <Image src='/images/home/banner-message.png' alt='banner message' w='34.3125rem' mr='1.875rem' />
      </Container>
    </Flex>
  );
}
