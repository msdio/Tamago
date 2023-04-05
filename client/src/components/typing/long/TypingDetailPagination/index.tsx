import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PRACTICE_LONG_PATH_DETAIL } from '@/constants/paths';
import { SmallLeftArrow, SmallRightArrow } from '@/icons/SmallArrow';

interface TypingPaginationProps {
  typingId: number;
  totalPage: number;
  currentPage: number;
  isTyping: boolean;
}

// NOTE: Pagination을 common component 에 만들었습니다. 확인 부탁드려요.
export default function TypingPagination({ typingId, totalPage, currentPage, isTyping }: TypingPaginationProps) {
  const router = useRouter();

  const onClickLeft = () => {
    if (currentPage <= 1) {
      return;
    }
    router.push({
      pathname: PRACTICE_LONG_PATH_DETAIL,
      query: { typingId, pageNum: currentPage - 1, isTyping: isTyping },
    });
  };

  const onClickRight = () => {
    if (currentPage >= totalPage) {
      return;
    }
    router.push({
      pathname: PRACTICE_LONG_PATH_DETAIL,
      query: { typingId, pageNum: currentPage + 1, isTyping: isTyping },
    });
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
