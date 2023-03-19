import { Box } from '@chakra-ui/react';
import Link from 'next/link';

import { Exit } from '@/icons/Exit';
import { PRACTICE_LONG_PATH } from '@/utils/paths';

export default function TypingExit() {
  return (
    <Link href={PRACTICE_LONG_PATH}>
      <Box w='38px' h='38px' border='0.6px solid black' borderRadius='50%' background='white' padding='5.5px 12px'>
        <Exit />
      </Box>
    </Link>
  );
}
