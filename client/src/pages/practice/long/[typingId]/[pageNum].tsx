import { useRouter } from 'next/router';

export default function LongTyping() {
  const router = useRouter();
  return <div>{router.asPath}</div>;
}
