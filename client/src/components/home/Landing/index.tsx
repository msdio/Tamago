import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { ScrollIndicator } from '@/icons/ScrollIndicator';

export default function Landing() {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      h='calc(100vh - 88px)'
      w='100%'
      position='relative'
      backgroundColor='#FFF6F1'
      backgroundImage='linear-gradient(#EFDFD3 0.6px, transparent 1px), linear-gradient(to right, #EFDFD3 1px, #FFF6F1 1px);'
      backgroundSize='3.75rem 3.7656rem'
    >
      <Image src='/images/home/yellow-chick.png' alt='yellow chick' w='8.775rem' transform='translateY(6.25rem)' />

      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        ml='4.375rem'
        mr='7.1188rem'
        transform='translateX(1.3719rem)'
      >
        <Image src='/images/home/main-image.png' alt='main image' w='38.2687rem' />
        <Text fontSize='15px' mt='33.8px' textAlign='center'>
          타마고는 개발자가 많이 사용하는 특수문자 또는 개발 언어를 연습하여 빠르게 치도록 도와줍니다.
          <br />
          자신의 타자 속도를 공유하며 코딩에 대한 소소한 재미를 가지며 코드의 정확도를 높일 수 있습니다.
        </Text>

        <Button size='md' mt='32px'>
          연습하기
        </Button>
      </Flex>

      <Image src='/images/home/white-chicken.png' alt='white chicken' w='9.225rem' transform='translateY(15.625rem)' />

      <ScrollIndicator />

      <Image
        src='/images/home/feather.png'
        alt='feather'
        w='3.625rem'
        position='absolute'
        top='18%'
        left='-9px'
        transform='rotate(100deg)'
      />
      <Image
        src='/images/home/feather.png'
        alt='feather'
        w='3.625rem'
        position='absolute'
        bottom='45%'
        right='4.6875rem'
      />
      <Image
        src='/images/home/feather.png'
        alt='feather'
        w='4.5187rem'
        position='absolute'
        bottom='-40px'
        right='23%'
        transform='scaleX(-1) rotate(10deg)'
      />
    </Flex>
  );
}
