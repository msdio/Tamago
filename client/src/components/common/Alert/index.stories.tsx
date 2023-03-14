import { ChakraProvider } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Alert from '@/components/common/Alert';
import theme from '@/styles/theme';

export default {
  title: 'components/common/CustomAlert',
  component: Alert,
  argTypes: {
    isOpen: {
      disabled: true,
    },
    onClose: {
      disabled: true,
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <Alert {...args} />
    </ChakraProvider>
  );
};

export const CustomAlert: ComponentStory<typeof Alert> = Template.bind({});

const msg = 'asdf123@naver.com 으로 인증메일이 발송되었습니다.';
CustomAlert.args = {
  header: msg,
  subHeader: '메일이 오지 않는다면 스팸함을 확인해 주세요.',
  isOpen: true,
  onClose: () => undefined,
};
