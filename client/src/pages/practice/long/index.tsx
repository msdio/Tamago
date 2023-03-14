import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getLongTypingWritingsAPI } from '@/apis/typing';
import PracticeLongList from '@/components/practice/long/List';
import type { LongTypingItem } from '@/types/typing';

export const getServerSideProps: GetServerSideProps<{ data: LongTypingItem[] }> = async () => {
  const data = await getLongTypingWritingsAPI();

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
  return <PracticeLongList typingList={data} />;
}
