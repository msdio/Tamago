import { Container, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { cardShadow } from '@/constants/animations';

const MenuCard = styled.div`
  width: 22.8125rem;
  height: 16.625rem;

  border: 0.95px solid black;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;

  padding: 2.1875rem 2.75rem;

  box-shadow: 8px 10px gray;
  cursor: pointer;

  :nth-child(1):hover {
    animation: ${cardShadow} 0.2s linear;
    box-shadow: 13px 15px orange;
  }
  :nth-child(2) {
    transform: translateY(-7.4375rem);
    :hover {
      animation: ${cardShadow} 0.2s linear;
      box-shadow: 13px 15px orange;
    }
  }
  :nth-child(3) {
    transform: translateY(-1.875rem);
    :hover {
      animation: ${cardShadow} 0.2s linear;
      box-shadow: 13px 15px orange;
    }
  }
`;

export default function Menus() {
  return (
    <Container maxW='container.xl' h='80vh' py='6.9375rem'>
      <Text fontSize='1.5625rem' marginBottom='.9375rem'>
        About Tamago
      </Text>
      <Text fontSize='2.25rem' fontWeight='bold'>
        개발할 때 쓰이는 코드로
        <br />
        다양하게 타자 연습을
        <br />할 수 있어요.
      </Text>

      <Flex marginTop='4.6875rem' gap='2.6875rem' w='100%' justifyContent='space-between'>
        <MenuCard>
          <Image
            w='5.9375rem'
            src='/images/home/ganada.png'
            alt='ganada'
            position='absolute'
            top='2.0625rem'
            right='2.0625rem'
          />
          <Text fontSize='1.875rem' fontWeight='bold'>
            긴글 연습
          </Text>
          <Text fontSize='1rem' marginTop='.875rem'>
            Lorem ipsum dolor sit amet,
            <br />
            consectetu
          </Text>
        </MenuCard>
        <MenuCard>
          <Image
            w='5.9375rem'
            src='/images/home/abc.png'
            alt='ganada'
            position='absolute'
            top='2.0625rem'
            right='2.0625rem'
          />
          <Text fontSize='1.875rem' fontWeight='bold'>
            짧은 글 연습
          </Text>
          <Text fontSize='1rem' marginTop='.875rem'>
            Lorem ipsum dolor sit amet,
            <br />
            consectetu
          </Text>
        </MenuCard>
        <MenuCard>
          <Image
            w='5.9375rem'
            src='/images/home/abc.png'
            alt='ganada'
            position='absolute'
            top='2.0625rem'
            right='2.0625rem'
          />
          <Text fontSize='1.875rem' fontWeight='bold'>
            글 등록
          </Text>
          <Text fontSize='1rem' marginTop='.875rem'>
            Lorem ipsum dolor sit amet,
            <br />
            consectetu
          </Text>
        </MenuCard>
      </Flex>
    </Container>
  );
}
