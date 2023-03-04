import { Box } from '@chakra-ui/react';

import PracticeLongLayout from '../Layout';

interface LongContentProps {
  title: string;
  content: string;
  currPage: number;
  totalPage: number;
}

export default function LongContent({ title, content, currPage, totalPage }: LongContentProps) {
  return (
    <PracticeLongLayout>
      <Box h='390px' border='0.6px solid #000000' borderRadius='10px' backgroundColor='#fff'></Box>
    </PracticeLongLayout>
  );
}
