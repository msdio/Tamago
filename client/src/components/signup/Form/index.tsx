import { Button, Flex, FormLabel, Input } from '@chakra-ui/react';
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
      <Flex direction='column' gap='8px' mb='25px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이름
        </FormLabel>
        <Input size='lg' name='name' placeholder='이름을 입력해 주세요.' value={name} onChange={handleInputChange} />
      </Flex>
      <Flex direction='column' gap='8px' mb='26px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이메일
        </FormLabel>
        <InputWithButton
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
      </Flex>
      <Flex direction='column' gap='8px' mb='57px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          비밀번호
        </FormLabel>
        <Flex direction='column' gap='16px'>
          <InputWithRegex
            size='lg'
            name='password'
            type='password'
            placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            regex={PASSWORD_REGEX}
            errorMessage='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            value={password}
            onChange={handleInputChange}
          />
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
        </Flex>
      </Flex>
      <Button size='lg'>회원가입</Button>
      <Or />
    </Flex>
  );
}
