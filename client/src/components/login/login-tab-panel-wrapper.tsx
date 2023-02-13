import { Flex, TabPanel } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export default function LoginTabPanelWrapper({ children }: { children: ReactNode }) {
  return (
    <TabPanel px={0}>
      <Flex flexDirection='column' gap='31px' maxW='486px' w='486px' h={'600px'} p={0} pt='50px'>
        {children}
      </Flex>
    </TabPanel>
  );
}
