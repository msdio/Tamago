import { Box, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Document } from '@/icons/Document';
import { BookmarkOff } from '@/icons/Heart';
import type { LongTypingItem } from '@/types/typing';
import { PRACTICE_LONG_PATH } from '@/utils/paths';

import PracticeLongLayout from '../Layout';

interface PracticeLongListProps {
  list: LongTypingItem[];
}

export default function PracticeLongList({ list }: PracticeLongListProps) {
  return (
    <PracticeLongLayout>
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
    </PracticeLongLayout>
  );
}
