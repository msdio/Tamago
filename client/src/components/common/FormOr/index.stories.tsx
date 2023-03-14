import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import FormOr from '.';

export default {
  title: 'components/common/Or',
  component: FormOr,
} as ComponentMeta<typeof FormOr>;

const Template: ComponentStory<typeof FormOr> = () => {
  return (
    <ChakraProvider theme={theme}>
      <FormOr />
    </ChakraProvider>
  );
};

export const Or: ComponentStory<typeof FormOr> = Template.bind({});
