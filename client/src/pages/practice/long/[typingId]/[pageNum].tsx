import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getLongTypingAPI } from '@/apis/typing';
import LongTyping from '@/components/practice/long/Content';
import PracticeLongTyping from '@/components/practice/long/Typing';
import type { LongTypingDetail } from '@/types/typing';

export const getServerSideProps: GetServerSideProps<{ data: LongTypingDetail; mode: string }> = async (context) => {
  const { typingId, pageNum, mode } = context.query as { typingId: string; pageNum: string; mode: string };

  const data = await getLongTypingAPI({ typingId, pageNum }); /* TODO: 에러 핸들링 */

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
