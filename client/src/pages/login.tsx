import { Flex, Heading } from '@chakra-ui/react';

import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {
  return (
    <Flex justifyContent='center'>
      <Flex flexDirection='column' maxW='486px' w='486px' py='100px'>
        <Heading fontSize='28px' fontWeight='bold' mb='57px' textAlign='center'>
          로그인
        </Heading>

        <LoginForm />
      </Flex>
    </Flex>
  );
}
