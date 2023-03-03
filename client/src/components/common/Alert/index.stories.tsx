import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Alert from '@/components/common/Alert';
import theme from '@/styles/theme';

export default {
  title: 'components/common/checkbox',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <Alert {...args}>{args.children}</Alert>
    </ChakraProvider>
  );
};

export const AlertTemplate: ComponentStory<typeof Alert> = Template.bind({});

AlertTemplate.args = {
  isOpen: true,
  onClose: () => undefined,
  children: (
    <Box lineHeight='160%'>
      <Text fontWeight='700'>asdf123@naver.com 으로</Text>
      <Text fontWeight='700'>인증메일이 발송되었습니다.</Text>
      <Text mt='6px'>메일이 오지 않는다면 스팸함을 확인해 주세요.</Text>
    </Box>
  ),
};
