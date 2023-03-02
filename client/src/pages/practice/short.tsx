import type { ShortTypingResponseType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import PracticeShort from '@/components/practice/short';

interface PracticeShortPageProps {
  data: ShortTypingResponseType;
}

export default function PracticeShortPage({ data }: PracticeShortPageProps) {
  return (
    <>
      <PracticeShort {...data} />;
    </>
  );
}

export async function getServerSideProps() {
  const data = await getShortTypingWritingsAPI();

  return { props: { data } };
}
