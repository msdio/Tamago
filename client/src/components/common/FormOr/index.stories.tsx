import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '@/styles/theme';

import FormOr from '.';

export default {
  title: 'components/common/FormOr',
  component: FormOr,
} as ComponentMeta<typeof FormOr>;

const Template: ComponentStory<typeof FormOr> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <FormOr />
    </ChakraProvider>
  );
};

export const FormOrTemplate: ComponentStory<typeof FormOr> = Template.bind({});

FormOrTemplate.args = {};
