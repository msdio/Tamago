import { Input, Flex, Checkbox, Button, Text, FormControl, FormLabel } from '@chakra-ui/react';
import Image from 'next/image';
import LoginEmailForm from './login-email-form';
import LoginPasswordForm from './password';

// NOTE : form 을 더 분리해야 할지는 후에 로직을 만들면서 생각해볼 것 같습니다.
function LoginForm() {
  return (
    <>
      <LoginEmailForm />
      <LoginPasswordForm />
      <Flex justifyContent='space-between'>
        <Checkbox defaultChecked colorScheme='tamago'>
          아이디 저장
        </Checkbox>
        <Flex color='#808080' gap='13px' fontSize='15px'>
          <Text>아이디 찾기</Text>
          <Text>|</Text>
          <Text>비밀번호 찾기</Text>
        </Flex>
      </Flex>
      <Button colorScheme='tamago' h='59px'>
        로그인
      </Button>
      <Button colorScheme='tamago' variant={'outline'} h='59px'>
        회원가입
      </Button>

      <Flex justifyContent='center' gap={4}>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/image/google-icon.svg' alt='google login' width={40} height={38} />
        </Button>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/image/github-icon.svg' alt='google login' width={40} height={38} />
        </Button>
      </Flex>
    </>
  );
}

export default LoginForm;
