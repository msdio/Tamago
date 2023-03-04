import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function PracticePage() {
  return (
    <>
      <Link href='/practice/long'>
        <Button>긴 글</Button>
      </Link>
      <Link href='/practice/short'>
        <Button>짧은 글</Button>
      </Link>
    </>
  );
}
