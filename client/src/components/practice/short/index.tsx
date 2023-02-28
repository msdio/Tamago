import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';

export default function PracticeShort() {
  const [writings, setWritings] = useState<ShortTypingType[]>([]);
  const [currentIdx, setcurrentIdx] = useState(0);
  const getShortTypingWritings = async () => {
    const res = await getShortTypingWritingsAPI();
    setWritings(res);
  };

  useEffect(() => {
    getShortTypingWritings();
  }, []);

  return (
    <Box margin='35px 120px'>
      <Flex border='1px solid rgb(0, 0, 0)'>
        <Box p={25} flex={1}>
          <Text>소요 시간</Text>
          <Text>00:06</Text>
        </Box>
        <Box p={25} borderLeft='1px solid #000' flex={1}>
          <Text>WPN</Text>
          <Text>30</Text>
        </Box>
        <Box p={25} borderLeft='1px solid #000' flex={1}>
          <Text>정확도</Text>
          <Text>99%</Text>
        </Box>
        <Box p={25} borderLeft='1px solid #000' flex={1}>
          <Text>타자</Text>
          <Text>130타</Text>
        </Box>
        <Box p={25} borderLeft='1px solid #000' flex={1}></Box>
        <Box p={25} borderLeft='1px solid #000' flex={1}>
          <Text>타마고 모드</Text>
        </Box>
      </Flex>

      {writings[currentIdx] && (
        <Box border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' h='403px' mt='27px'>
          <CurrentTyping writing={writings[currentIdx]} />
        </Box>
      )}
    </Box>
  );
}
