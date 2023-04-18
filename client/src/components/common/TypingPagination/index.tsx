import { Box, Flex, Text } from '@chakra-ui/react';

import { SmallLeftArrow, SmallRightArrow } from '@/icons/SmallArrow';

interface PaginationProps {
  currentPage: number;
  totalPage: number;

  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export default function TypingPagination({ onClickLeft, onClickRight, currentPage, totalPage }: PaginationProps) {
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
      {onClickLeft && (
        <Box onClick={onClickLeft}>
          <SmallLeftArrow />
        </Box>
      )}
      <Box mt='2px'>
        <Text as='span' color='primary.dark'>
          {currentPage}
        </Text>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <Text as='span'>{totalPage}</Text>
      </Box>
      {onClickRight && (
        <Box onClick={onClickRight}>
          <SmallRightArrow />
        </Box>
      )}
    </Flex>
  );
}
