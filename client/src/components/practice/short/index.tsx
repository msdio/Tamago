import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBarItem from '@/components/practice/short/InfoBar/InfoBarItem';

export default function PracticeShort() {
  const [writings, setWritings] = useState<ShortTypingType[]>([]);
  const [currentIdx, setcurrentIdx] = useState(0);

  const getShortTypingWritings = async () => {
    const { typingWritings } = await getShortTypingWritingsAPI();
    setWritings(typingWritings);
  };

  useEffect(() => {
    getShortTypingWritings();
  }, []);

  return (
    <Box p='35px 120px' minW='1100px'>
      <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h={'56px'}>
        <InfoBarItem label='소요 시간' content={'00:06'} />
        <InfoBarItem label='WPM' content={'30'} />
        <InfoBarItem label='정확도' content={'99%'} />
        <InfoBarItem label='타자' content={'130타'} />

        <Box p={25} borderLeft='1px solid #000' flex={1}></Box>
        <Flex
          pl={23}
          pr={27}
          borderLeft='1px solid #000'
          flex={1}
          flexDirection='row-reverse'
          alignItems='center'
          gap={1}
        >
          <Text fontWeight={600} fontSize={18} lineHeight='18px'>
            님
          </Text>
          <Text fontWeight={800} fontSize={18} lineHeight='18px'>
            타마고
          </Text>
        </Flex>
      </Flex>

      {writings[currentIdx] && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' h='403px' mt='27px'>
          <Box
            border='0.6px solid #000000'
            position='absolute'
            w='calc(100% + 32px)'
            left='--16px'
            right='-16px'
            top='0'
            bottom='0'
            margin='auto'
            h='fit-content'
          >
            <CurrentTyping writing={writings[currentIdx]} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
