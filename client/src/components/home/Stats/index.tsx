import { Container, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import { fadeIn } from '@/constants/animations';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { RightArrowWithCircle } from '@/icons/RightArrowWithCircle';

const StatCard = styled.div`
  width: 48.25rem;
  height: 25.25rem;

  display: flex;
  flex-direction: column;
  position: relative;

  padding: 3.3125rem 3.5625rem;

  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 5px;

  z-index: 2;
`;

const StatCardShadow = styled.div`
  width: 48.25rem;
  height: 25.25rem;

  background-color: #f6f6f6;
  border: 1px solid black;
  border-radius: 5px;

  transform: translateX(1.1875rem) translateY(1.3125rem);

  z-index: 1;
  position: absolute;
`;

const Badge = styled.div`
  width: fit-content;
  height: 3.8125rem;

  padding: 0.875rem 1.8125rem;

  border: 1px solid black;
  border-radius: 40px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.75rem;
    font-weight: bold;
  }

  :nth-child(2) {
    transform: translateX(3.1875rem);
  }
  :nth-child(3) {
    transform: translateX(0.9375rem);
  }
`;

export default function Stats() {
  const observerRef = useRef<HTMLDivElement>(null);
  const animationTrigger = useIntersectionObserver({ ref: observerRef, threshold: 0.3 });

  return (
    <Flex
      w='100vw'
      h='653px'
      bgColor='#FAFAFA'
      ref={observerRef}
      opacity={animationTrigger ? 1 : 0}
      animation={animationTrigger ? `${fadeIn} 1s linear` : ''}
    >
      <Container maxW='container.xl' py='6.9375rem' display='flex' justifyContent='space-between'>
        <StatCard>
          <Text fontSize='1.5625rem' mb='1.3125rem'>
            Statistics
          </Text>
          <Text fontSize='2.25rem' fontWeight='bold' mb='1.4375rem'>
            타자를 측정하고 분석하여
            <br />
            본인의 타이핑 실력을
            <br />
            객관적으로 알 수 있어요.
          </Text>

          <RightArrowWithCircle />

          <Image
            src='/images/home/graph-circle.png'
            alt='circle graph'
            w='15.75rem'
            h='15.5rem'
            position='absolute'
            bottom='0'
            right='0'
          />
        </StatCard>

        <StatCardShadow />

        <Flex w='23.875rem' display='flex' flexDirection='column' gap='1.375rem' position='relative'>
          <Badge>
            <Text>정확도</Text>
          </Badge>
          <Badge>
            <Text>소요 시간</Text>
          </Badge>
          <Badge>
            <Text>속도</Text>
          </Badge>

          <Image src='/images/home/graph-bar.png' alt='bar graph' w='10rem' position='absolute' bottom='0' right='0' />
        </Flex>
      </Container>
    </Flex>
  );
}
