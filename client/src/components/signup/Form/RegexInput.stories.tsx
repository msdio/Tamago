import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../../styles/theme';
import { PASSWORD_REGEX } from '../../../utils/regex';
import RegexInput from './RegexInput';

export default {
  title: 'components/signup/form/RegexInput',
  component: RegexInput,
} as ComponentMeta<typeof RegexInput>;

const Template: ComponentStory<typeof RegexInput> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <RegexInput {...args} />
    </ChakraProvider>
  );
};

export const EmailInputTemplate: ComponentStory<typeof RegexInput> = Template.bind({});

EmailInputTemplate.args = {
  type: 'password',
  label: '비밀번호',
  placeholder: '비밀번호을 입력해 주세요.',
  errorMessage: '8-12자 영문 + 숫자를 포함하여 입력해 주세요.',
  regex: PASSWORD_REGEX,
};
