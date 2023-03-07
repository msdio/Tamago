import { ChakraProvider, Flex, Input } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

interface InputSampleProps {
  size: 'lg' | 'md';
  placeholder: string;
}

const InputSample = ({ size, placeholder }: InputSampleProps) => {
  return <Input placeholder={placeholder} size={size} />;
};

export default {
  title: 'Design System/Inputs',
  component: InputSample,
  argTypes: {
    size: {
      options: ['lg', 'md'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof InputSample>;

const Template: ComponentStory<typeof InputSample> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction='column' gap={5}>
        <InputSample {...args} />
        <Input isDisabled value='Input (Disabled)' {...args} />
      </Flex>
    </ChakraProvider>
  );
};

export const Inputs: ComponentStory<typeof InputSample> = Template.bind({});

Inputs.args = {
  size: 'lg',
  placeholder: '텍스트 내용을 입력하세요.',
};
