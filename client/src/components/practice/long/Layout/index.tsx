import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const GridBackground = styled.div`
  width: 100%;
  height: 1000px;
  background-size: 50px 50px;
  background-image: linear-gradient(90deg, #fff6f1 1px, transparent 1px), linear-gradient(#fff6f1 1px, transparent 1px);
`;

interface PracticeLongLayoutProps {
  children: React.ReactNode;
}

export default function PracticeLongLayout({ children }: PracticeLongLayoutProps) {
  return (
    <>
      <GridBackground>
        <Box w='1170px' h='390px' p='35px 135px 0 135px'>
          {children}
        </Box>
      </GridBackground>
    </>
  );
}
