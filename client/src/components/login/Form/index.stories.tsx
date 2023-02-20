import { ChakraProvider, theme } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginForm from '@/components/login/Form';

export default {
  title: 'components/loginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => {
  return (
    <ChakraProvider theme={theme}>
      <LoginForm {...args} />
    </ChakraProvider>
  );
};

export const LoginFormTemplate: ComponentStory<typeof LoginForm> = Template.bind({});

LoginFormTemplate.args = {
  onLogin: async () => undefined,
};
