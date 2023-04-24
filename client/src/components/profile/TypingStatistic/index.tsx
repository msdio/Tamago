import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { getAccuracyStatistic, getSpeedStatistic } from '@/apis/statistic';
import LineChart from '@/components/charts/LineChart';
import { getDateMMDDFormat, getLastWeekDate } from '@/utils/time';

enum TypingStatisticEnum {
  ACCURACY = '정확도 변화',
  SPEED = '타수 변화',
}

type CharDataType = Record<string, number> | null;

export default function TypingStatistic() {
  const [selectStatistic, setSelectStatistic] = useState(TypingStatisticEnum.ACCURACY);
  const accuracyData = useRef(null);
  const speedData = useRef(null);
  const [chartData, setChartData] = useState<[CharDataType, CharDataType]>([null, null]);

  const initSetting = async () => {
    const startDay = getDateMMDDFormat(getLastWeekDate());
    const endDay = getDateMMDDFormat(new Date());

    speedData.current = await getSpeedStatistic({
      startDay,
      endDay,
    });

    accuracyData.current = await getAccuracyStatistic({
      startDay,
      endDay,
    });

    setChartData([accuracyData.current, speedData.current]);
  };

  useEffect(() => {
    initSetting();
  }, []);

  return (
    <>
      <Flex padding='16px 5px' alignItems='center' justifyContent='space-between'>
        <Text as='h2' textStyle='text/hd4'>
          타자 통계
        </Text>

        <Text cursor='pointer' textStyle='text/medium' colorScheme='white' color='gray.dark' h='26px' w='fit-content'>
          전체보기
        </Text>
      </Flex>
      <Box
        border='0.6px solid'
        borderColor='gray.main'
        bg='white.light'
        borderRadius='10px'
        padding='21px 28px'
        h='353px'
      >
        <Flex gap='16px'>
          <Text
            color={selectStatistic === TypingStatisticEnum.ACCURACY ? 'black.main' : 'gray.dark'}
            textStyle='text/medium'
            onClick={() => setSelectStatistic(TypingStatisticEnum.ACCURACY)}
            cursor='pointer'
          >
            {TypingStatisticEnum.ACCURACY}
          </Text>
          <Text
            color={selectStatistic === TypingStatisticEnum.SPEED ? 'black.main' : 'gray.dark'}
            textStyle='text/medium'
            onClick={() => setSelectStatistic(TypingStatisticEnum.SPEED)}
            cursor='pointer'
          >
            {TypingStatisticEnum.SPEED}
          </Text>
        </Flex>

        {chartData[0] && chartData[1] ? (
          <Box>
            <LineChart
              chartTitle='타자 통계'
              chartData={chartData as [Record<string, number>, Record<string, number>]}
            />
          </Box>
        ) : (
          <Flex justifyContent='center' alignItems='center' h='100%'>
            <Text textStyle='text/medium'>데이터가 없습니다.</Text>
          </Flex>
        )}
      </Box>
    </>
  );
}
