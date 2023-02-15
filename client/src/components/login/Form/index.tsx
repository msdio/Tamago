import { Box, Button, Checkbox, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import FormOr from '@/components/common/FormOr';
import RegexInput from '@/components/common/RegexInput';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

function LoginForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <>
      <RegexInput
        label='이메일'
        size='lg'
        name='email'
        type='email'
        placeholder='이메일을 입력해 주세요.'
        regex={EMAIL_REGEX}
        errorMessage='이메일 형식을 확인해 주세요.'
        value={email}
        onChange={handleInputChange}
      />
      <Box my='26px'>
        <RegexInput
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

      <Flex w='full' justifyContent='space-between' mt='20px'>
        <Checkbox defaultChecked colorScheme='tamago'>
          아이디 저장
        </Checkbox>
        <Flex gap='13px' fontSize='15px'>
          <Link href='/findPassword'>
            <Text color='#808080'>비밀번호 찾기</Text>
          </Link>
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
