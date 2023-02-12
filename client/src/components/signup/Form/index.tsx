import { Box, Button, Flex, Image } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Or from '../../common/Or';
import InputWithButton from './InputWithButton';
import InputWithRegex from './InputWithRegex';

// 이런 정규식 및 관련 함수들은 유틸로 빼는게 좋을까요?
const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,12}$/;
const getPasswordRegex = (password: string) => new RegExp(`^${password}$`);

export default function SignupForm() {
  const [signupInputs, setSignupInputs] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const { name, email, password, verifyPassword } = signupInputs;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  return (
    <Flex direction='column'>
      <Box mb='25px'>
        <InputWithRegex
          label='이름'
          size='lg'
          name='name'
          placeholder='이름을 입력해 주세요.'
          value={name}
          onChange={handleInputChange}
        />
      </Box>
      <Box mb='26px'>
        <InputWithButton
          label='이메일'
          size='md'
          name='email'
          type='email'
          placeholder='이메일을 입력해 주세요.'
          regex={EMAIL_REGEX}
          errorMessage='이메일 형식을 확인해 주세요.'
          value={email}
          onChange={handleInputChange}
          buttonText='중복 확인'
        />
      </Box>
      <Box mb='16px'>
        <InputWithRegex
          label='비밀번호'
          size='lg'
          name='password'
          type='password'
          placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          regex={PASSWORD_REGEX}
          errorMessage='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          value={password}
          onChange={handleInputChange}
        />
      </Box>
      <Box mb='57px'>
        <InputWithRegex
          size='lg'
          name='verifyPassword'
          type='password'
          placeholder='비밀번호를 한 번 더 입력해 주세요.'
          regex={getPasswordRegex(password)}
          errorMessage='비밀번호가 일치하지 않습니다.'
          value={verifyPassword}
          onChange={handleInputChange}
        />
      </Box>
      <Button size='lg'>회원가입</Button>
      <Or />
      <Flex justifyContent='center' gap={4}>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/images/google-icon.svg' alt='google login' width={40} height={38} />
        </Button>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/images/github-icon.svg' alt='google login' width={40} height={38} />
        </Button>
      </Flex>
    </Flex>
  );
}
