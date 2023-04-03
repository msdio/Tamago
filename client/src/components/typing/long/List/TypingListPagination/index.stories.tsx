import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import TypingListPagination from '.';

export default {
  title: 'components/practice/long/TypingListPagination',
  component: TypingListPagination,
} as ComponentMeta<typeof TypingListPagination>;

const Template: ComponentStory<typeof TypingListPagination> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <TypingListPagination {...args} />
    </ChakraProvider>
  );
};

export const CustomTypingListPagination: ComponentStory<typeof TypingListPagination> = Template.bind({});

CustomTypingListPagination.args = {
  currentPage: 1,
  totalPage: 10,
};
