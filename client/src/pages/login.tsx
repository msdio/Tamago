import Image from 'next/image';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import LoginLayout from '../../component/login/layout';
import LoginForm from '../../component/login/login-form';

export default function LoginPage() {
  return (
    <LoginLayout>
      <Tabs variant='unstyled'>
        <TabList>
          <LoginTab>로그인</LoginTab>
          <LoginTab>게스트</LoginTab>
        </TabList>

        <TabPanels>
          <TabPanelWrapper>
            <LoginForm />
          </TabPanelWrapper>
          <TabPanelWrapper>
            <p>two!</p>
          </TabPanelWrapper>
        </TabPanels>
      </Tabs>
    </LoginLayout>
  );
}

function LoginTab({ children }: { children: string }) {
  return (
    <Tab
      _selected={{ borderBottom: '5px solid #FF8A65', fontWeight: 700 }}
      borderBottom='5px solid #fff'
      padding={0}
      marginRight={6}
    >
      {children}
    </Tab>
  );
}

function TabPanelWrapper({ children }: { children: ReactNode }) {
  return (
    <TabPanel px={0}>
      <Flex flexDirection='column' gap={4} maxW='486px' w='486px' h={'600px'} p={0}>
        {children}
      </Flex>
    </TabPanel>
  );
}
