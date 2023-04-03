import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import TypingExit from '.';

export default {
  title: 'components/practice/long/TypingExit',
  component: TypingExit,
} as ComponentMeta<typeof TypingExit>;

const Template: ComponentStory<typeof TypingExit> = () => {
  return (
    <ChakraProvider theme={theme}>
      <TypingExit />
    </ChakraProvider>
  );
};

export const CustomTypingExit: ComponentStory<typeof TypingExit> = Template.bind({});

CustomTypingExit.args = {
  totalPage: 10,
  currentPage: 1,
};
