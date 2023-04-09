import { Box, Container, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';

import PrepareAlert from '@/components/common/PrepareAlert';
import { fadeIn } from '@/constants/animations';
import { PRACTICE_LONG_PATH_LIST, PRACTICE_SHORT_PATH } from '@/constants/paths';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useToggle from '@/hooks/useToggle';

import MenuCard from './MenuCard';

export default function Menus() {
  const observerRef = useRef<HTMLDivElement>(null);
  const animationTrigger = useIntersectionObserver({ ref: observerRef, threshold: 0.3 });
  const [isModalOpen, handleModalOpen] = useToggle();

  return (
    <Container
      maxW='container.xl'
      h='80vh'
      py='6.9375rem'
      ref={observerRef}
      opacity={animationTrigger ? 1 : 0}
      animation={animationTrigger ? `${fadeIn} 1s linear` : ''}
    >
      <Text fontSize='1.5625rem' marginBottom='.9375rem' marginLeft='1.375rem'>
        About Tamago
      </Text>
      <Text fontSize='2.25rem' fontWeight='bold'>
        개발할 때 쓰이는 코드로
        <br />
        다양하게 타자 연습을
        <br />할 수 있어요.
      </Text>

      <Flex marginTop='4.6875rem' w='100%' justifyContent='space-around'>
        <Link href={PRACTICE_LONG_PATH_LIST}>
          <MenuCard language='kr' title='긴 글 연습' content='Lorem ipsum dolor sit amet, consectetu' />
        </Link>
        <Link href={`${PRACTICE_SHORT_PATH}?language=javascript`}>
          <Box transform='translateY(-9.3125rem)'>
            <MenuCard language='en' title='짧은 글 연습' content='Lorem ipsum dolor sit amet, consectetu' />
          </Box>
        </Link>
        <Link href={'/register'}>
          <Box transform='translateY(-3.0625rem)'>
            <MenuCard language='en' title='글 등록' content='Lorem ipsum dolor sit amet, consectetu' />
          </Box>
        </Link>
      </Flex>

      <PrepareAlert isOpen={isModalOpen} onClose={handleModalOpen} />
    </Container>
  );
}
