import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import IconButton from '@/components/common/IconButton';
import PracticeLongLayout from '@/components/typing/long/Layout';
import TypingDetailPagination from '@/components/typing/long/TypingDetailPagination';
import TypingLine from '@/components/typing/long/TypingLine';
import { PRACTICE_LONG_PATH_LIST } from '@/constants/paths';
import { Exit } from '@/icons/Exit';
import type { LongTypingDetail } from '@/types/typing';
import { slicedContentAndStrings } from '@/utils/typing';

export default function LongContent({ content, currentPage, language, title, totalPage, typingId }: LongTypingDetail) {
  const router = useRouter();

  const handleExit = () => {
    router.push(PRACTICE_LONG_PATH_LIST);
  };

  return (
    <PracticeLongLayout>
      <Flex mb='21px' justifyContent='right'>
        <IconButton icon={<Exit />} onAction={handleExit} />
      </Flex>
      <Flex
        h='550px'
        direction='column'
        border='0.6px solid #000000'
        borderRadius='10px'
        backgroundColor='#fff'
        p='34px 53px'
      >
        {slicedContentAndStrings(content).map(([line], i) => (
          <TypingLine key={i} originalLine={line} states={'c'.repeat(line.length)} />
        ))}
      </Flex>
      <Flex mt='33px' justifyContent='right'>
        <TypingDetailPagination typingId={typingId} currentPage={currentPage} totalPage={totalPage} isTyping={false} />
      </Flex>
    </PracticeLongLayout>
  );
}
