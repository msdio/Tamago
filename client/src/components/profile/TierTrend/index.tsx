import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import AreaChart from '@/components/charts/AreaChart';
import SelectTrend from '@/components/profile/TierTrend/SelectTrend';

const CharTestData = {
  '01.01': 20,
  '01.02': 80,
  '01.03': 320,
  '01.04': 320,
  '01.05': 120,
  '01.06': 220,
  '01.07': 300,
};

enum TierTrendEnum {
  LONG = '긴 글',
  SHORT = '짧은 글',
}

export default function TierTrend({}) {
  const [selectTierTrend, setSelectTierTrend] = useState(TierTrendEnum.LONG);

  return (
    <Box border='0.6px solid' borderColor='gray/main' bg='white/light' borderRadius='10px' w='516px'>
      <Flex borderBottomColor='gray.main' padding='16px 26px' borderBottom='0.6px solid' justifyContent='space-between'>
        <Text as='h2' textStyle='text/hd4'>
          티어 추이
        </Text>

        <Flex gap='12px'>
          <SelectTrend isSelected={selectTierTrend === TierTrendEnum.LONG}>긴 글</SelectTrend>
          <SelectTrend isSelected={selectTierTrend === TierTrendEnum.SHORT}>짧은 글</SelectTrend>
        </Flex>
      </Flex>

      <Box padding='50px 35px'>
        {/* char 잘리는 문제는 width가 작아서 그런것 같아요. chart를 수정해야 할 것 같습니다.  */}
        <AreaChart chartTitle={'티어 추이'} chartData={CharTestData} />
      </Box>
    </Box>
  );
}
