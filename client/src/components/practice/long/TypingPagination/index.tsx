import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { SmallLeftArrow, SmallRightArrow } from '@/icons/SmallArrow';

interface TypingPaginationProps {
  totalPage: number;
  currentPage: number;
}

export default function TypingPagination({ totalPage, currentPage }: TypingPaginationProps) {
  const router = useRouter();

  const onClickLeft = () => {
    if (currentPage <= 1) {
      return;
    }
    router.push(`/practice/long/typing?page=${currentPage - 1}`);
  };

  const onClickRight = () => {
    if (currentPage >= totalPage) {
      return;
    }
    router.push(`/practice/long/typing?page=${currentPage + 1}`);
  };

  return (
    <Flex
      w='115px'
      h='38px'
      border='0.6px solid #000000'
      borderRadius='28px'
      backgroundColor='secondary.light'
      justifyContent='space-evenly'
      alignItems='center'
      fontSize='16px'
    >
      <Box onClick={onClickLeft}>
        <SmallLeftArrow />
      </Box>
      <Box mt='2px'>
        <Text as='span' color='primary.dark'>
          {currentPage}
        </Text>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <Text as='span'>{totalPage}</Text>
      </Box>
      <Box onClick={onClickRight}>
        <SmallRightArrow />
      </Box>
    </Flex>
  );
}
