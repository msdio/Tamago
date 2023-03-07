import { Button, ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from './theme';

interface ButtonSampleProps {
  scheme: 'primary' | 'gray';
  size: 'lg' | 'md' | 'sm' | 'xs';
  text: string;
}

const ButtonSample = ({ scheme, size, text }: ButtonSampleProps) => {
  return (
    <Button size={size} colorScheme={scheme} mb={5}>
      {text}
    </Button>
  );
};
const OutlinePrimaryButtonSample = ({ scheme, size, text }: ButtonSampleProps) => {
  return (
    <Button size={size} colorScheme={scheme} variant='outline' mb={5}>
      {text + ' (Outline)'}
    </Button>
  );
};
const OutlineButtonSample = ({ scheme, size, text }: ButtonSampleProps) => {
  return (
    <Button
      size={size}
      colorScheme={scheme}
      variant='outline'
      backgroundColor='white.light'
      color={scheme === 'primary' ? 'primary.main' : 'gray.main'}
      mb={5}
    >
      {text + ' (Outline)'}
    </Button>
  );
};

export default {
  title: 'Design System/Buttons',
  component: ButtonSample,
  argTypes: {
    scheme: {
      options: ['primary', 'gray'],
      control: { type: 'radio' },
    },
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof ButtonSample>;

const Template: ComponentStory<typeof ButtonSample> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <ButtonSample {...args}>{args.text}</ButtonSample>
      <OutlinePrimaryButtonSample {...args}>{args.text}</OutlinePrimaryButtonSample>
      <OutlineButtonSample {...args}>{args.text}</OutlineButtonSample>
      <Button {...args} isDisabled>
        {args.text + ' (Disabled)'}
      </Button>
    </ChakraProvider>
  );
};

export const Buttons: ComponentStory<typeof ButtonSample> = Template.bind({});

Buttons.args = {
  scheme: 'primary',
  size: 'md',
  text: 'Button',
};
