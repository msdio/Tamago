import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import LineChart from '.';

export default {
  title: 'components/charts/LineChart',
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <LineChart {...args} />
    </ChakraProvider>
  );
};

export const lineChart: ComponentStory<typeof LineChart> = Template.bind({});

lineChart.args = {
  chartTitle: 'line chart title',
  chartData: [
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
  ],
};
