import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../../styles/theme';
import SignupForm from '.';

export default {
  title: 'components/signupForm',
  component: SignupForm,
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = () => {
  return (
    <ChakraProvider theme={theme}>
      <SignupForm />
    </ChakraProvider>
  );
};

export const CheckboxTemplate: ComponentStory<typeof SignupForm> = Template.bind({});
