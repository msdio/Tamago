import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import LongTyping from '@/components/practice/long/Content';
import PracticeLongTyping from '@/components/practice/long/Typing';

interface Data {
  contentTitle: string;
  content: string;
  isTyping: boolean;
  currPage: number;
  totalPage: number;
}

interface LongTypingResponse {
  contentTitle: string;
  content: string;
  currPage: number;
  totalPage: number;
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
  const { isTyping, typingId, pageNum } = context.query as { isTyping: string; typingId: string; pageNum: string };

  const res: { data: LongTypingResponse } = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          contentTitle: '영어와 한글이 혼합된 글',
          content: 'str = "test한글";\ncheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;\nif(check.test(str)) alert!("한글이 있습니다.")',
          currPage: parseInt(pageNum),
          totalPage: 3,
        },
      });
    }, 100);
  });

  return {
    props: {
      data: { ...res.data, isTyping: isTyping === 'true' },
    },
  };
};

export default function LongTypingPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {data.isTyping ? (
        <PracticeLongTyping
          title={data.contentTitle}
          content={data.content}
          currPage={data.currPage}
          totalPage={data.totalPage}
        />
      ) : (
        <LongTyping
          title={data.contentTitle}
          content={data.content}
          currPage={data.currPage}
          totalPage={data.totalPage}
        />
      )}
    </>
  );
}
