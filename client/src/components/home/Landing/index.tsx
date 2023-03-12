import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { jumping, jumpingShadow } from '@/constants/animations';
import { ScrollIndicator } from '@/icons/ScrollIndicator';

export default function Landing() {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      h='calc(100vh - 5.5rem)'
      w='100%'
      position='relative'
      backgroundColor='background.main'
      backgroundImage='linear-gradient(#EFDFD3 .0375rem, transparent .0625rem), linear-gradient(to right, #EFDFD3 .0625rem, #FFF6F1 .0625rem);'
      backgroundSize='60px 60.2496px'
    >
      <Flex w='142.04px' h='226.3008px' flexDirection='column' justifyContent='space-between'>
        <Image
          src='/images/home/yellow-chick.png'
          alt='yellow chick'
          w='133px'
          animation={jumping + ' 2s infinite ease'}
        />
        <Image
          src='/images/home/yellow-chick-shadow.png'
          alt='yellow chick'
          w='110px'
          transform='translateX(25px)'
          animation={jumpingShadow + ' 2s infinite ease'}
        />
      </Flex>

      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        ml='1.625rem'
        mr='29px'
        transform='translateY(-60px)'
      >
        <Image src='/images/home/main-image.png' alt='main image' w='48rem' />
        <Text fontSize='1.1875rem' fontWeight='bold' mt='1.25rem' textAlign='center'>
          타마고는 개발자가 많이 사용하는 특수문자 또는 개발 언어를 연습하여 빠르게 칠 수 있도록 도와줍니다.
          <br />
          자신의 타자 속도를 공유하며 코딩에 대한 소소한 재미를 가지며 코드의 정확도를 높일 수 있습니다.
        </Text>

        <Button size='md' mt='3.75rem'>
          연습하기
        </Button>
      </Flex>

      <Image src='/images/home/white-chicken.png' alt='white chicken' w='147.6px' transform='translateY(250px)' />

      <ScrollIndicator />

      <Image
        src='/images/home/feather.png'
        alt='feather'
        w='58px'
        position='absolute'
        top='18%'
        left='-0.5625rem'
        transform='rotate(100deg)'
      />
      <Image src='/images/home/feather.png' alt='feather' w='58px' position='absolute' bottom='45%' right='75px' />
      <Image
        src='/images/home/feather.png'
        alt='feather'
        w='72.2992px'
        position='absolute'
        bottom='-2.5rem'
        right='23%'
        transform='scaleX(-1) rotate(10deg)'
      />
    </Flex>
  );
}
