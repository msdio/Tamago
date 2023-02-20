import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import RegexInput from '.';

export default {
  title: 'components/common/RegexInput',
  component: RegexInput,
} as ComponentMeta<typeof RegexInput>;

const Template: ComponentStory<typeof RegexInput> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <RegexInput {...args} />
    </ChakraProvider>
  );
};

export const RegexInputTemplate: ComponentStory<typeof RegexInput> = Template.bind({});

RegexInputTemplate.args = {
  type: 'password',
  label: '비밀번호',
  placeholder: '비밀번호을 입력해 주세요.',
  errorMessage: '8-12자 영문 + 숫자를 포함하여 입력해 주세요.',
  isValid: false,
};
