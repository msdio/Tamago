import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import PracticeLongList from '@/components/practice/long/List';
import type { LongTypingItem } from '@/types/typing';

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
  return <PracticeLongList list={data} />;
}
