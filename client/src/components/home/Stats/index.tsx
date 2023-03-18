import { Container, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import { fadeIn } from '@/constants/animations';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { RightArrowWithCircle } from '@/icons/RightArrowWithCircle';

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

const Badge = styled.div<{ trans: string }>`
  width: fit-content;
  height: 3.8125rem;

  padding: 11px 42px 10px 42px;

  border: 1px solid black;
  border-radius: 40px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 25px;
    font-weight: 600;
    line-height: 40px;
  }

  transform: translateX(${(props) => props.trans});
`;

export default function Stats() {
  const observerRef = useRef<HTMLDivElement>(null);
  const animationTrigger = useIntersectionObserver({ ref: observerRef, threshold: 0.3 });

  return (
    <Flex
      w='100vw'
      h='653px'
      bgColor='background.white'
      ref={observerRef}
      opacity={animationTrigger ? 1 : 0}
      animation={animationTrigger ? `${fadeIn} 1s linear` : ''}
    >
      <Container maxW='container.xl' py='6.9375rem' display='flex' gap='1.1875rem' justifyContent='space-evenly'>
        <Flex>
          <Flex
            w='48.25rem'
            h='25.25rem'
            direction='column'
            justifyContent='space-between'
            position='relative'
            p='3.3125rem 3.5625rem'
            backgroundColor='white.light'
            border='1px solid black'
            borderRadius='5px'
            zIndex='2'
          >
            <Flex direction='column'>
              <Text fontSize='1.1875rem' fontWeight='600' mb='1rem'>
                Statistics
              </Text>
              <Text fontSize='1.875rem' fontWeight='700' mb='1.4375rem'>
                타자를 측정하고 분석하여
                <br />
                본인의 타이핑 실력을
                <br />
                객관적으로 알 수 있어요.
              </Text>
            </Flex>

            <Flex>
              <RightArrowWithCircle />
            </Flex>

            <Image
              src='/images/home/graph-circle.png'
              alt='circle graph'
              w='15.75rem'
              h='15.5rem'
              position='absolute'
              bottom='0'
              right='0'
            />
          </Flex>

          <StatCardShadow />
        </Flex>

        <Flex
          w='23.875rem'
          p='1.875rem 2.875rem'
          display='flex'
          flexDirection='column'
          gap='1.3125rem'
          position='relative'
        >
          <Badge trans='0'>
            <Text>정확도</Text>
          </Badge>
          <Badge trans='3.1875rem'>
            <Text>소요 시간</Text>
          </Badge>
          <Badge trans='0.9375rem'>
            <Text>속도</Text>
          </Badge>

          <Image src='/images/home/graph-bar.png' alt='bar graph' w='10rem' position='absolute' bottom='0' right='0' />
        </Flex>
      </Container>
    </Flex>
  );
}
