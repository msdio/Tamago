import { Text, Th } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const RoundTableRow = styled(Th)`
  background-color: #ececec;

  &:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-of-type {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

interface THeadRowProps {
  minW?: string;
}

export default function THeadRow({ children, minW }: PropsWithChildren<THeadRowProps>) {
  return (
    <RoundTableRow minW={minW}>
      <Text textStyle='text/regular'>{children}</Text>
    </RoundTableRow>
  );
}
