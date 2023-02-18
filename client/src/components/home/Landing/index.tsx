import { Button, Flex, Image, Text } from '@chakra-ui/react';

export default function Landing() {
  return (
    <Flex
      h='calc(100vh - 88px)'
      w='100%'
      backgroundImage='/images/home/background.png'
      backgroundSize='contain'
      justifyContent='center'
      alignItems='center'
    >
      <Image
        src='/images/home/yellow-chick.png'
        alt='yellow chick'
        w='140.4px'
        h='226.3px'
        mr='70px'
        transform='translateY(100px)'
      />

      <Flex direction='column' justifyContent='center' alignItems='center'>
        <Image src='/images/home/main-image.png' alt='main image' w='704px' h='360px' />
        <Text fontSize='15px' mt='33.8px' textAlign='center'>
          타마고는 개발자가 많이 사용하는 특수문자 또는 개발 언어를 연습하여 빠르게 치도록 도와줍니다.
          <br />
          자신의 타자 속도를 공유하며 코딩에 대한 소소한 재미를 가지며 코드의 정확도를 높일 수 있습니다.
        </Text>

        <Button size='md' mt='32px'>
          연습하기
        </Button>
      </Flex>

      <Image
        src='/images/home/white-chicken.png'
        alt='white chicken'
        w='147.6px'
        h='170.7px'
        ml='113.9px'
        transform='translateY(250px)'
      />
    </Flex>
  );
}
