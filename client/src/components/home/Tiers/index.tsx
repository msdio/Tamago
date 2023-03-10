import { Container, Flex, Text } from '@chakra-ui/react';
import { useRef } from 'react';

import { Tier } from '@/components/common/Tier';
import { fadeIn } from '@/constants/animations';
import { tierInfo } from '@/constants/tierInfo';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function Tiers() {
  const observerRef = useRef<HTMLDivElement>(null);
  const animationTrigger = useIntersectionObserver({ ref: observerRef, threshold: 0.3 });

  return (
    <Container
      maxW='container.xl'
      w='100%'
      h='47.3125rem'
      mt='7rem'
      display='flex'
      flexDirection='column'
      textAlign='center'
      ref={observerRef}
      opacity={animationTrigger ? 1 : 0}
      animation={animationTrigger ? `${fadeIn} 1s linear` : ''}
    >
      <Text fontSize='1.875rem' fontWeight='700' lineHeight='48px'>
        본인의 레벨에 맞는 티어를 통해
        <br />
        성장하고 공유할 수 있어요.
      </Text>

      <Flex gap='1.625rem' justifyContent='center' mt='4.4375rem'>
        {tierInfo.map((el) => (
          <Flex key={el.level} w='178px' h='17.875rem' alignItems='center' flexDirection='column'>
            <Flex w='100%' h='15.375rem' flexDirection='column' justifyContent='space-between' alignItems='center'>
              <Flex w='172.7px' h='172px' alignItems='center' flexDirection='column'>
                <Tier level={el.level} />
              </Flex>
              <Text fontSize='1.625rem' fontWeight='extrabold' mt='1.625rem' alignItems='flex-end'>
                {el.text}
              </Text>
            </Flex>
            <Text fontSize='19px' fontWeight='600' mt='.9375rem'>
              {el.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
}
