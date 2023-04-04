import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import PracticeLongLayout from '@/components/typing/long/Layout';
import { LONG_TYPING_TYPE } from '@/constants/language';
import { PRACTICE_LONG_PATH_DETAIL } from '@/constants/paths';
import { Document } from '@/icons/Document';
import { BookmarkOff } from '@/icons/Heart';
import { Search } from '@/icons/Search';
import type { LongTypingItem } from '@/types/typing';

import TypingListPagination from './TypingListPagination';

interface PracticeLongListProps {
  currentPage: number;
  totalPage: number;
  typingList: LongTypingItem[];
}

export default function PracticeLongList({ currentPage, totalPage, typingList }: PracticeLongListProps) {
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
                <Th width='50%'>제목명</Th>
                <Th width='9%'>타입</Th>
                <Th width='9%'>페이지 수</Th>
                <Th width='9%'>조회수</Th>
                <Th width='14%'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {typingList.map(({ language, thumbnail, title, totalPage, typingId, viewCount }: LongTypingItem) => (
                <Tr key={typingId}>
                  <Td textAlign='center'>{typingId}</Td>
                  <Td>
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
    </PracticeLongLayout>
  );
}
