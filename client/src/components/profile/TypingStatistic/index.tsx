import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import LineChart from '@/components/charts/LineChart';

enum TypingStatisticEnum {
  ACCURACY = '정확도 변화',
  SPEED = '타수 변화',
}

const CharTestData = [
  {
    '01.01': 79,
    '01.02': 75,
    '01.03': 70,
    '01.04': 81,
    '01.05': 79,
    '01.06': 99,
    '01.07': 61,
  },
  {
    '01.01': 69,
    '01.02': 71,
    '01.03': 79,
    '01.04': 83,
    '01.05': 95,
    '01.06': 84,
    '01.07': 82,
  },
];

export default function TypingStatistic() {
  const [selectStatistic, setSelectStatistic] = useState(TypingStatisticEnum.ACCURACY);

  return (
    <Box w='727px'>
      <Flex padding='16px 5px' alignItems='center' justifyContent='space-between'>
        <Text as='h2' textStyle='text/hd4'>
          타자 통계
        </Text>

        <Text textStyle='text/medium' colorScheme='white' color='gray.dark' h='26px' w='fit-content'>
          전체보기
        </Text>
      </Flex>
      <Box border='0.6px solid' borderColor='gray/main' bg='white/light' borderRadius='10px' padding='21px 28px'>
        <Flex gap='16px'>
          <Text
            color={selectStatistic === TypingStatisticEnum.ACCURACY ? 'black.main' : 'gray.dark'}
            textStyle='text/medium'
            onClick={() => setSelectStatistic(TypingStatisticEnum.ACCURACY)}
          >
            {TypingStatisticEnum.ACCURACY}
          </Text>
          <Text
            color={selectStatistic === TypingStatisticEnum.SPEED ? 'black.main' : 'gray.dark'}
            textStyle='text/medium'
            onClick={() => setSelectStatistic(TypingStatisticEnum.SPEED)}
          >
            {TypingStatisticEnum.SPEED}
          </Text>
        </Flex>

        <LineChart chartTitle='타자 통계' chartData={CharTestData} />
      </Box>
    </Box>
  );
}
