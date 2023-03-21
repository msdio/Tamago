import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import EmailInput from '@/components/signup/Form/EmailInput';
import theme from '@/styles/theme';

export default {
  title: 'components/signup/InputEmail',
  component: EmailInput,
} as ComponentMeta<typeof EmailInput>;

const Template: ComponentStory<typeof EmailInput> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <EmailInput {...args} />
    </ChakraProvider>
  );
};

export const InputEmail: ComponentStory<typeof EmailInput> = Template.bind({});

InputEmail.args = {
  type: 'email',
  label: '이메일',
  placeholder: '이메일을 입력해 주세요.',
  errorMessage: '이메일 형식을 확인해 주세요.',
  buttonText: '중복 확인',
  isValid: false,
};
