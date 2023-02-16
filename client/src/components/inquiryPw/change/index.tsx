import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import AuthLayout from '@/components/common/AuthLayout';
import RegexInput from '@/components/common/RegexInput';
import { PASSWORD_REGEX } from '@/utils/regex';

interface PasswordChangeProps {
  handleNextStep: () => void;
}

export default function PasswordChange({ handleNextStep }: PasswordChangeProps) {
  const [inputs, setInputs] = useState({
    password: '',
    newPassword: '',
  });

  const { password, newPassword } = inputs;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <AuthLayout title={'비밀번호 찾기'} desc='원하시는 새로운 비밀번호로 변경해 주세요.'>
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
      <Box my='26px'>
        <RegexInput
          label='비밀번호'
          size='lg'
          name='newPassword'
          type='password'
          placeholder='비밀번호를 한 번 더 입력해 주세요.'
          regex={PASSWORD_REGEX}
          errorMessage='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          value={newPassword}
          onChange={handleInputChange}
        />
      </Box>

      <Button colorScheme='secondary' size='lg' onClick={handleNextStep}>
        비밀번호 변경하기
      </Button>

      <Flex gap='10px' justifyContent='center' mt='24px'>
        <Text color='#808080'>계정이 없으신가요?</Text>
        <Link href='/signup'>
          <Text>회원가입하기</Text>
        </Link>
      </Flex>
    </AuthLayout>
  );
}
