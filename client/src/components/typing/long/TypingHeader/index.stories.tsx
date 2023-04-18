import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import TypingHeader from '.';

export default {
  title: 'components/practice/long/TypingHeader',
  component: TypingHeader,
} as ComponentMeta<typeof TypingHeader>;

const Template: ComponentStory<typeof TypingHeader> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <TypingHeader {...args} />
    </ChakraProvider>
  );
};

export const CustomTypingHeader: ComponentStory<typeof TypingHeader> = Template.bind({});

CustomTypingHeader.args = {
  accuracy: 88.2,
  time: 7,
  wpm: 32,
  speed: 123,
};
