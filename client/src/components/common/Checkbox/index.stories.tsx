import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../../styles/theme';
import { CustomCheckbox } from '.';

export default {
  title: 'components/common/checkbox',
  component: CustomCheckbox,
} as ComponentMeta<typeof CustomCheckbox>;

const Template: ComponentStory<typeof CustomCheckbox> = () => {
  return (
    <ChakraProvider theme={theme}>
      <CustomCheckbox />
    </ChakraProvider>
  );
};

export const CheckboxTemplate: ComponentStory<typeof CustomCheckbox> = Template.bind({});
