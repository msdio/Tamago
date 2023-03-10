import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

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
              <Th>Title</Th>
              <Th>Type</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map(({ language, thumbnail, typingId, title }: LongTypingItem) => (
              <Tr key={typingId}>
                <Td>
                  <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1?isTyping=true`}>{title}</Link>
                </Td>
                <Td>{language}</Td>
                <Td>
                  <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1`}>조회하기</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PracticeLongLayout>
  );
}
