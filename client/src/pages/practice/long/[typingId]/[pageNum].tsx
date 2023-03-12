import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import LongTyping from '@/components/practice/long/Content';
import PracticeLongTyping from '@/components/practice/long/Typing';
import type { LongTypingDetail } from '@/types/typing';

interface LongTypingResponse {
  code: number;
  description: string;
  result: LongTypingDetail;
}

export const getServerSideProps: GetServerSideProps<{ data: LongTypingDetail; mode: string }> = async (context) => {
  const { typingId, pageNum, mode } = context.query as { typingId: string; pageNum: string; mode: string };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long/detail?longTypingId=${typingId}&page=${pageNum}`,
  );
  const data: LongTypingResponse = await res.json();

  return {
    props: {
      data: data.result,
      mode: mode !== 'practice' ? 'view' : mode,
    },
  };
};

export default function LongTypingPage({ data, mode }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <>{mode === 'practice' ? <PracticeLongTyping {...data} /> : <LongTyping {...data} />}</>;
}
