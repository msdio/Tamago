import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import theme from '../../styles/theme';
import Footer from '.';

export default {
  title: 'components/common/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return (
    <ChakraProvider theme={theme}>
      <Footer />
    </ChakraProvider>
  );
};

export const footer: ComponentStory<typeof Footer> = Template.bind({});
