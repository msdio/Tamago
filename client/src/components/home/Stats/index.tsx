import { Container, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { RightArrowWithCircle } from '@/icons/RightArrowWithCircle';

const StatCard = styled.div`
  width: 772px;
  height: 404px;

  display: flex;
  flex-direction: column;
  position: relative;

  padding: 53px 57px;

  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 5px;

  z-index: 2;
`;

const StatCardShadow = styled.div`
  width: 772px;
  height: 404px;

  background-color: #f6f6f6;
  border: 1px solid black;
  border-radius: 5px;

  transform: translateX(19px) translateY(21px);

  z-index: 1;
  position: absolute;
`;

const Badge = styled.div`
  width: fit-content;
  height: 61px;

  padding: 14px 29px;

  border: 1px solid black;
  border-radius: 40px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 28px;
    font-weight: bold;
  }

  :nth-child(2) {
    transform: translateX(51px);
  }
  :nth-child(3) {
    transform: translateX(15px);
  }
`;

export default function Stats() {
  return (
    <div style={{ width: '100vw', height: '653px', backgroundColor: '#FAFAFA' }}>
      <Container maxW='container.xl' py='6.9375rem' display='flex' justifyContent='space-between'>
        <StatCard>
          <Text fontSize='25px' mb='21px'>
            Statistics
          </Text>
          <Text fontSize='36px' fontWeight='bold' mb='23px'>
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
            w='252px'
            h='248px'
            position='absolute'
            bottom='0'
            right='0'
          />
        </StatCard>

        <StatCardShadow />

        <div
          style={{
            width: '382px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            position: 'relative',
          }}
        >
          <Badge>
            <Text>정확도</Text>
          </Badge>
          <Badge>
            <Text>소요 시간</Text>
          </Badge>
          <Badge>
            <Text>속도</Text>
          </Badge>

          <Image src='/images/home/graph-bar.png' alt='bar graph' w='160px' position='absolute' bottom='0' right='0' />
        </div>
      </Container>
    </div>
  );
}
