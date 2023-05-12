import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import PracticeLongLayout from '@/components/typing/long/Layout';
import { LONG_TYPING_TYPE } from '@/constants/language';
import { PRACTICE_LONG_PATH_DETAIL } from '@/constants/paths';
import { Document } from '@/icons/Document';
import { BookmarkOff } from '@/icons/Heart';
import { Search } from '@/icons/Search';
import type { LongTypingItem } from '@/types/typing';

import SortBy from './SortBy';
import TypingListPagination from './TypingListPagination';
import TypingThumbnail from './TypingThumbnail';

interface PracticeLongListProps {
  currentPage: number;
  totalPage: number;
  typingList: LongTypingItem[];
}

export default function PracticeLongList({ currentPage, totalPage, typingList }: PracticeLongListProps) {
  const [currThumbnail, setCurrThumbnail] = useState<{ thumbnail: string; y: number; x: number }>();

  const timeout = useRef(0);

  const onMouseMove = (thumbnail: string) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      clearTimeout(timeout.current);
      if (thumbnail == currThumbnail?.thumbnail) {
        setCurrThumbnail({ ...currThumbnail, y: e.pageY, x: e.pageX });
        return;
      }
      timeout.current = window.setTimeout(() => {
        setCurrThumbnail({ thumbnail, y: e.pageY, x: e.pageX });
      }, 1000);
    };
  };

  const onMouseLeave = () => {
    clearTimeout(timeout.current);
    setCurrThumbnail(undefined);
  };

  return (
    <PracticeLongLayout>
      <Flex direction='column'>
        <Box textAlign='center' h='121px' pos='relative'>
          <Flex pos='absolute' right='0' bottom='0' mb='33px' gap='16px'>
            <InputGroup>
              <InputLeftElement pointerEvents='none' h='47px' w='50px'>
                <Search />
              </InputLeftElement>
              <Input
                w='289px'
                h='47px'
                pl='50px'
                bg='#F2F2F2'
                border='none'
                borderRadius='20px'
                placeholder='검색하기'
                _placeholder={{ color: '#7D7D7D', fontSize: '18px' }}
              />
            </InputGroup>
          </Flex>

          <Heading fontSize='28px' fontWeight='600' lineHeight='121px'>
            긴 글 연습타자
          </Heading>
        </Box>
        <TableContainer border='0.6px solid black' borderRadius='10px'>
          <Table variant='striped-reverse'>
            <Thead>
              <Tr>
                <Th textAlign='center' width='9%'>
                  번호
                </Th>
                <Th width='42%'>제목명</Th>
                <Th width='12%'>타입</Th>
                <Th width='12%'>페이지 수</Th>
                <Th width='12%'>조회수</Th>
                <Th width='12%'>
                  <SortBy />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {typingList.map(({ language, thumbnail, title, totalPage, typingId, viewCount }: LongTypingItem) => (
                <Tr key={typingId}>
                  <Td textAlign='center'>{typingId}</Td>
                  <Td
                    pos='relative'
                    overflow={'visible'}
                    onMouseMove={onMouseMove(thumbnail)}
                    onMouseLeave={onMouseLeave}
                  >
                    <Link href={`${PRACTICE_LONG_PATH_DETAIL}?typingId=${typingId}&pageNum=1&isTyping=true`}>
                      {title}
                    </Link>
                  </Td>
                  <Td>{LONG_TYPING_TYPE[language]}</Td>
                  <Td>{totalPage}쪽</Td>
                  <Td>{viewCount}</Td>
                  <Td display='flex' gap='32.4px' justifyContent='end'>
                    <Link href={`${PRACTICE_LONG_PATH_DETAIL}?typingId=${typingId}&pageNum=1`}>
                      <Document />
                    </Link>
                    <Box>
                      <BookmarkOff />
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <TypingListPagination currentPage={currentPage} totalPage={totalPage} />
      </Flex>
      {currThumbnail && <TypingThumbnail thumbnail={currThumbnail.thumbnail} y={currThumbnail.y} x={currThumbnail.x} />}
    </PracticeLongLayout>
  );
}
