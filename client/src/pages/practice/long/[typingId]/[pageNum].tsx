import { Text } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import LongTyping from '@/components/practice/long';

interface Data {
  content: string;
  isTyping: boolean;
  currPage: number;
  totalPage: number;
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
  const { isTyping, typingId, pageNum } = context.query as { isTyping: string; typingId: string; pageNum: string };
  // const res = await fetch(`http://localhost:3000/api/typing/long?typingId=${typingId}&page=${pageNum}`);

  const res: { data: Data } = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          content: 'str = "test한글";\ncheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;\nif(check.test(str)) alert!("한글이 있습니다.")',
          isTyping: isTyping === 'true',
          currPage: parseInt(pageNum),
          totalPage: 3,
        } as Data,
      });
    }, 100);
  });

  const { data } = res;

  return {
    props: {
      data,
    },
  };
};

export default function LongTypingPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Text>{data.isTyping}</Text>
      <Text>
        {data.currPage}/{data.totalPage}
      </Text>
      <LongTyping data={data.content} />
    </>
  );
}
