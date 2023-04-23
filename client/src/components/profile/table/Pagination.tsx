import { Button, Flex } from '@chakra-ui/react';

import { SmallLeftArrow, SmallRightArrow } from '@/icons/SmallArrow';

interface PaginationProps {
  currentPage: number;
  totalPage: number;

  onClick: (nextPage: number) => void;
}

export default function Pagination({ currentPage, totalPage, onClick }: PaginationProps) {
  const onPrevClick = () => {
    onClick(currentPage - 1 > 0 ? currentPage - 1 : 0);
  };

  const onNextClick = () => {
    onClick(currentPage + 1 < totalPage ? currentPage + 1 : totalPage - 1);
  };

  return (
    <Flex justifyContent='center'>
      <Button w='fit-content' h='26px' bg='transparent' colorScheme='white' onClick={onPrevClick}>
        <SmallLeftArrow />
      </Button>
      {new Array(totalPage).fill(0).map((_, index) => {
        return (
          <Button
            key={index}
            w='26px'
            h='26px'
            color={currentPage === index ? 'primary.dark' : 'gray.dark'}
            bg='transparent'
            colorScheme='white'
            onClick={() => onClick(index)}
          >
            {index + 1}
          </Button>
        );
      })}
      <Button w='fit-content' h='26px' bg='transparent' colorScheme='white' onClick={onNextClick}>
        <SmallRightArrow />
      </Button>
    </Flex>
  );
}
