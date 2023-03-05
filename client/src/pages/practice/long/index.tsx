import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

import { PRACTICE_LONG_PATH } from '@/utils/paths';

interface LongTypingItem {
  typingId: number;
  typingTitle: string;
  typingType: string;
}

export default function PracticeLongPage() {
  const [longTypingList, setLongTypingList] = useState<LongTypingItem[]>([
    {
      typingId: 1,
      typingTitle: '애국가',
      typingType: 'hangul',
    },
    {
      typingId: 2,
      typingTitle: '한글 영어 혼합 글',
      typingType: 'code',
    },
    {
      typingId: 3,
      typingTitle: 'react',
      typingType: 'code',
    },
  ]);

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th></Th>
            </Tr>
          </Thead>
          {longTypingList.map(({ typingId, typingTitle, typingType }) => (
            <Thead key={typingId}>
              <Tr>
                <Th>
                  <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1?isTyping=true`}>{typingTitle}</Link>
                </Th>
                <Th>{typingType}</Th>
                <Th>
                  <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1`}>조회하기</Link>
                </Th>
              </Tr>
            </Thead>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}
