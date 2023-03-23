import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import TypingPagination from '.';

export default {
  title: 'components/practice/long/TypingPagination',
  component: TypingPagination,
} as ComponentMeta<typeof TypingPagination>;

const Template: ComponentStory<typeof TypingPagination> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <TypingPagination {...args} />
    </ChakraProvider>
  );
};

export const CustomTypingPagination: ComponentStory<typeof TypingPagination> = Template.bind({});

CustomTypingPagination.args = {
  totalPage: 10,
  currentPage: 1,
};
