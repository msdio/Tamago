import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import Guest from '../components/login/guest';
import LoginLayout from '../components/login/layout';
import LoginForm from '../components/login/login-form';
import LoginTab from '../components/login/login-tab';
import TabPanelWrapper from '../components/login/login-tab-panel-wrapper';

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
            <Guest />
          </TabPanelWrapper>
        </TabPanels>
      </Tabs>
    </LoginLayout>
  );
}
