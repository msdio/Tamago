import { Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { cardUp } from '@/constants/animations';

const Container = styled.div`
  display: flex;
  position: relative;

  &:hover {
    animation: ${cardUp} 0.2s linear;
    transform: translateY(-10px);

    div:nth-of-type(2) {
      background-color: #ff8a65;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 22.8125rem;
  height: 16.625rem;

  border: 1px solid black;
  border-radius: 5px;

  padding: 2.1875rem 2.75rem;

  background-color: #ffffff;

  cursor: pointer;

  z-index: 2;
`;

const Shadow = styled.div`
  width: 22.8125rem;
  height: 16.625rem;

  background-color: #bfbfbf;
  border: 1px solid black;
  border-radius: 5px;

  transform: translateX(20px) translateY(20px);

  z-index: 1;
  position: absolute;
`;

interface CardProps {
  language: 'kr' | 'en';
  title: string;
  content: string;
}

export default function MenuCard({ language, title, content }: CardProps) {
  return (
    <Container>
      <Card>
        <Image
          w='5.9375rem'
          src={language === 'en' ? '/images/home/abc.png' : '/images/home/ganada.png'}
          alt='ganada'
          position='absolute'
          top='2.0625rem'
          right='2.0625rem'
        />
        <Text fontSize='1.875rem' fontWeight='bold'>
          {title}
        </Text>
        <Text fontSize='1rem' marginTop='.875rem'>
          {content}
        </Text>
      </Card>
      <Shadow />
    </Container>
  );
}
