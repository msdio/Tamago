import { Flex, Text } from '@chakra-ui/react';

import { SmallLeftArrow, SmallRightArrow } from '@/icons/SmallArrow';

interface TypingListPaginationProps {
  currentPage: number;
  totalPage: number;
}

const MAX_PAGE_INDEX = 5;

const getCurrentIndexArr = (currentPage: number, totalPage: number) => {
  const currentIndex = (currentPage - 1) % MAX_PAGE_INDEX; // 0 ~ 4
  const accumulatedIndex = currentPage - (currentIndex + 1);
  const startIndex = accumulatedIndex + 1;
  const endIndex = Math.min(totalPage, accumulatedIndex + MAX_PAGE_INDEX);
  return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
};

export default function TypingListPagination({ currentPage, totalPage }: TypingListPaginationProps) {
  return (
    <Flex gap='50px' justifyContent='center' m='43px 0' alignItems='center'>
      <SmallLeftArrow />
      <Flex gap='10px'>
        {getCurrentIndexArr(currentPage, totalPage).map((index) => {
          if (index === currentPage) {
            return (
              <Text
                key={index}
                w='28px'
                h='28px'
                textAlign='center'
                lineHeight='28px'
                bg='primary.light'
                borderRadius='50'
              >
                {index}
              </Text>
            );
          } else {
            return (
              <Text key={index} w='28px' h='28px' textAlign='center' lineHeight='28px'>
                {index}
              </Text>
            );
          }
        })}
      </Flex>
      <SmallRightArrow />
    </Flex>
  );
}
