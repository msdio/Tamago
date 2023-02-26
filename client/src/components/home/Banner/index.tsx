import { Container, Image, Text } from '@chakra-ui/react';

export default function Banner() {
  return (
    <div style={{ width: '100vw', height: '199px', backgroundColor: '#FF8A65' }}>
      <Container maxW='container.xl' h='100%' display='flex' alignItems='center' justifyContent='space-between'>
        <Text fontSize='36px' fontWeight='extrabold' color='#FFFFFF'>
          이제는 개발에 재미를 더해요.
        </Text>

        <Image src='/images/home/banner-message.png' alt='banner message' w='549px' mr='30px' />
      </Container>
    </div>
  );
}
