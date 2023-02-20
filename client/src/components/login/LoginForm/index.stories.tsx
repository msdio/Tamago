import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../../styles/theme';
import LoginForm from '.';

export default {
  title: 'components/loginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <LoginForm />
    </ChakraProvider>
  );
};

export const CheckboxTemplate: ComponentStory<typeof LoginForm> = Template.bind({});
