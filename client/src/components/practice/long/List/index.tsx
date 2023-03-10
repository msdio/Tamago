import { Box, Flex, Heading, Link, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { Document } from '@/icons/Document';
import DownArrow from '@/icons/DownArrow';
import { BookmarkOff } from '@/icons/Heart';
import UpDownArrow from '@/icons/UpDownArrow';
import type { LongTypingItem } from '@/types/typing';
import { PRACTICE_LONG_PATH } from '@/utils/paths';

import PracticeLongLayout from '../Layout';

interface PracticeLongListProps {
  list: LongTypingItem[];
}

export default function PracticeLongList({ list }: PracticeLongListProps) {
  return (
    <PracticeLongLayout>
      <Flex direction='column'>
        <Box textAlign='center' h='121px' pos='relative'>
          <Flex pos='absolute' bottom='0' mb='21px' gap='16px'>
            <Flex
              alignItems='center'
              gap='8.5px'
              border='0.6px solid #000000'
              bg='#BCF075'
              w='fit-content'
              h='38px'
              p='10px 23px'
              borderRadius={30}
            >
              <Text fontSize='18px' fontWeight={500}>
                연습타자
              </Text>
              <DownArrow />
            </Flex>
            <Flex
              alignItems='center'
              gap='8.5px'
              border='0.6px solid #000000'
              bg='gray.light'
              w='fit-content'
              h='38px'
              p='10px 23px'
              borderRadius={30}
            >
              <Text fontSize='18px' fontWeight={500}>
                정렬
              </Text>
              <UpDownArrow />
            </Flex>
          </Flex>

          <Heading fontSize='28px' fontWeight='600' lineHeight='121px'>
            긴글타자
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
                <Th width='9%'>평균타수</Th>
                <Th width='14%'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map(({ language, thumbnail, title, totalPage, typingId, viewCount }: LongTypingItem) => (
                <Tr key={typingId}>
                  <Td textAlign='center'>{typingId}</Td>
                  <Td>
                    <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1?isTyping=true`}>{title}</Link>
                  </Td>
                  <Td>{language}</Td>
                  <Td>{totalPage}</Td>
                  <Td>{viewCount}</Td>
                  <Td display='flex' gap='32.4px' justifyContent='end'>
                    <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1`}>
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
      </Flex>
    </PracticeLongLayout>
  );
}
