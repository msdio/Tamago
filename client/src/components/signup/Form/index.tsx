import { Button, Flex, FormLabel } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import InputForm from '../../common/InputForm';
import Or from './Or';

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
      <Flex direction='column' gap='8px' mb='26px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이름
        </FormLabel>
        <InputForm name='name' placeholder='이름을 입력해 주세요.' value={name} onChange={handleInputChange} />
      </Flex>
      <Flex direction='column' gap='8px' mb='37px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이메일
        </FormLabel>
        <Flex gap='13px'>
          <InputForm
            name='email'
            w='351px'
            type='email'
            placeholder='이메일을 입력해 주세요.'
            regex={/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
            errorMessage='이메일 형식을 확인해 주세요.'
            value={email}
            onChange={handleInputChange}
          />
          <Button size='sm' colorScheme='secondary' variant='outline'>
            중복 확인
          </Button>
        </Flex>
      </Flex>
      <Flex direction='column' gap='8px' mb='41px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          비밀번호
        </FormLabel>
        <Flex direction='column' gap='16px'>
          <InputForm
            name='password'
            type='password'
            placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            regex={/^(?=.*[A-Za-z])(?=.*\d).{8,12}$/}
            errorMessage='8-12자 영문, 숫자를 사용해 주세요.'
            value={password}
            onChange={handleInputChange}
          />
          <InputForm
            name='verifyPassword'
            type='password'
            placeholder='비밀번호를 한 번 더 입력해 주세요.'
            regex={new RegExp(`^${password}$`)}
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
