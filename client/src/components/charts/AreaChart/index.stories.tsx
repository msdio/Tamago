import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import AreaChart from '.';

export default {
  title: 'components/charts/AreaChart',
  component: AreaChart,
} as ComponentMeta<typeof AreaChart>;

const Template: ComponentStory<typeof AreaChart> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <AreaChart {...args} />
    </ChakraProvider>
  );
};

export const areaChart: ComponentStory<typeof AreaChart> = Template.bind({});

areaChart.args = {
  chartTitle: 'area chart title',
  chartData: {
    '01.01': 320,
    '01.02': 480,
    '01.03': 920,
    '01.04': 920,
    '01.05': 720,
    '01.06': 820,
    '01.07': 920,
  },
};
