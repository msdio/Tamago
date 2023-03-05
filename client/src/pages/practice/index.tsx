import { Button } from '@chakra-ui/react';
import Link from 'next/link';

import { PRACTICE_LONG_PATH, PRACTICE_SHORT_PATH } from '@/utils/paths';

export default function PracticePage() {
  return (
    <>
      <Link href={PRACTICE_LONG_PATH}>
        <Button>긴 글</Button>
      </Link>
      <Link href={PRACTICE_SHORT_PATH}>
        <Button>짧은 글</Button>
      </Link>
    </>
  );
}
