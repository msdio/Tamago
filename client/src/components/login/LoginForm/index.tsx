import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import FormOr from '@/components/common/FormOr';

import LoginEmailForm from './login-email-form';
import LoginPasswordForm from './password';

// NOTE : form 을 더 분리해야 할지는 후에 로직을 만들면서 생각해볼 것 같습니다.
function LoginForm() {
  return (
    <>
      <LoginEmailForm />
      <LoginPasswordForm />
      <Flex w='full' justifyContent='space-between' mt='20px'>
        <Checkbox defaultChecked colorScheme='tamago'>
          아이디 저장
        </Checkbox>
        <Flex gap='13px' fontSize='15px'>
          <Text color='#808080'>비밀번호 찾기</Text>
          <Text color='#808080'>|</Text>
          <Text fontWeight='bold'>회원가입 하기</Text>
        </Flex>
      </Flex>
      <Button size='lg' mt='42px'>
        로그인
      </Button>
      <Box my='54px'>
        <FormOr />
      </Box>

      <Flex justifyContent='center' gap='29.5px'>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/images/google-icon.svg' alt='google login' width={40} height={38} />
        </Button>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/images/github-icon.svg' alt='google login' width={40} height={38} />
        </Button>
      </Flex>
    </>
  );
}

export default LoginForm;
