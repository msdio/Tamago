import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { PRACTICE_LONG_PATH } from '@/utils/paths';

interface LongTypingItem {
  language: string;
  thumbnail: string;
  title: string;
  totalPage: number;
  typingId: number;
  viewCount: number;
}

interface LongTypingListResponse {
  code: number;
  description: string;
  result: [LongTypingItem];
}

export const getServerSideProps: GetServerSideProps<{ data: LongTypingItem[] }> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long`);
  const data: LongTypingListResponse = await res.json();

  return {
    props: {
      data: data.result,
    },
  };
};

interface PracitionLongPageProps extends InferGetServerSidePropsType<typeof getServerSideProps> {
  data: LongTypingItem[];
}

export default function PracticeLongPage({ data }: PracitionLongPageProps) {
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
          {data.map(({ language, thumbnail, typingId, title }: LongTypingItem) => (
            <Thead key={typingId}>
              <Tr>
                <Th>
                  <Link href={`${PRACTICE_LONG_PATH}/${typingId}/1?isTyping=true`}>{title}</Link>
                </Th>
                <Th>{language}</Th>
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
