import { Flex, Heading } from '@chakra-ui/react';

import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {
  return (
    <Flex justifyContent='center'>
      <Flex flexDirection='column' gap='31px' maxW='486px' w='486px' h={'600px'} p={0} pt='50px' alignItems='center'>
        <Heading>로그인</Heading>

        <LoginForm />
      </Flex>
    </Flex>
  );
}
