import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { useRef } from 'react';

import { fadeIn } from '@/constants/animations';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import MenuCard from './MenuCard';

export default function Menus() {
  const observerRef = useRef<HTMLDivElement>(null);
  const animationTrigger = useIntersectionObserver({ ref: observerRef, threshold: 0.3 });

  return (
    <Container
      maxW='container.xl'
      h='80vh'
      py='6.9375rem'
      ref={observerRef}
      opacity={animationTrigger ? 1 : 0}
      animation={animationTrigger ? `${fadeIn} 1s linear` : ''}
    >
      <Text fontSize='1.5625rem' marginBottom='.9375rem'>
        About Tamago
      </Text>
      <Text fontSize='2.25rem' fontWeight='bold'>
        개발할 때 쓰이는 코드로
        <br />
        다양하게 타자 연습을
        <br />할 수 있어요.
      </Text>

      <Flex marginTop='4.6875rem' w='100%' justifyContent='space-around'>
        <MenuCard language='kr' title='긴 글 연습' content='Lorem ipsum dolor sit amet, consectetu' />
        <Box transform='translateY(-9.3125rem)'>
          <MenuCard language='en' title='짧은 글 연습' content='Lorem ipsum dolor sit amet, consectetu' />
        </Box>
        <Box transform='translateY(-3.0625rem)'>
          <MenuCard language='en' title='글 등록' content='Lorem ipsum dolor sit amet, consectetu' />
        </Box>
      </Flex>
    </Container>
  );
}
