import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../styles/theme';
import { Footer } from '.';

export default {
  title: 'components/footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <Footer />
    </ChakraProvider>
  );
};

export const CheckboxTemplate: ComponentStory<typeof Footer> = Template.bind({});
