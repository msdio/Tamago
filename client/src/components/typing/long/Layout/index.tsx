import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const GridBackground = styled.div`
  width: 100%;
  background-size: 50px 50px;
  background-image: linear-gradient(90deg, #fff6f1 1px, transparent 1px), linear-gradient(#fff6f1 1px, transparent 1px);
`;

interface LongLayoutProps {
  children: React.ReactNode;
}

export default function LongLayout({ children }: LongLayoutProps) {
  return (
    <>
      <GridBackground>
        <Box w='1170px' p='35px 0' m='auto' minW='1100px'>
          {children}
        </Box>
      </GridBackground>
    </>
  );
}
