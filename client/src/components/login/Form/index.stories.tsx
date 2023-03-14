import { ChakraProvider, theme } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginForm from '@/components/login/Form';

export default {
  title: 'components/login/Form',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <LoginForm {...args} />
    </ChakraProvider>
  );
};

export const Form: ComponentStory<typeof LoginForm> = Template.bind({});

Form.args = {
  onLogin: async () => undefined,
};
