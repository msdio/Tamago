import { Box } from '@chakra-ui/react';

import LineChart from '@/components/charts/LineChart';

export default function Profile() {
  const chartData = {
    '01.01': 320,
    '01.02': 480,
    '01.03': 920,
    '01.04': 920,
    '01.05': 720,
    '01.06': 820,
    '01.07': 920,
  };

  const chartData2 = [
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

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} w={'661px'} h={'100vh'} margin={30}>
      {/* <AreaChart chartTitle='testing area chart' chartData={chartData} /> */}
      <LineChart chartTitle='line chart test' chartData={chartData2} />
    </Box>
  );
}
