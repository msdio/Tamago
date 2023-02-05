import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import LoginLayout from '../../component/login/layout';
import LoginForm from '../../component/login/login-form';
import LoginTab from '../../component/login/login-tab';
import TabPanelWrapper from '../../component/login/login-tab-panel-wrapper';

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
            <p>게스트</p>
          </TabPanelWrapper>
        </TabPanels>
      </Tabs>
    </LoginLayout>
  );
}
