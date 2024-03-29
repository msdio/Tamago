import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { kakaoLoginAPI } from '@/apis/auth';
import { CustomCheckbox } from '@/components/common/Checkbox';
import FormOr from '@/components/common/FormOr';
import RegexInput from '@/components/common/RegexInput';
import { INQUIRY_PW_PATH, SIGNUP_TERM_PATH } from '@/constants/paths';
import useRegexInputs from '@/hooks/useRegexInputs';
import { GithubLogo } from '@/icons/GithubLogo';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

export type InputType = {
  email: string;
  password: string;
};

type InputValidType = { email: boolean; password: boolean };

interface LoginFormProps {
  onLogin: ({}: InputType) => Promise<void>;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [inputs, valids, handleInputChange] = useRegexInputs({
    email: EMAIL_REGEX,
    password: PASSWORD_REGEX,
  });

  const { email, password } = inputs as InputType;
  const { email: isEmailValid, password: isPasswordValid } = valids as InputValidType;

  const isLoginDisabled = !(isEmailValid && isPasswordValid);

  const onSubmit = () => {
    onLogin({ email, password });
  };

  const onKakaoLogin = () => {
    kakaoLoginAPI();
  };

  return (
    <>
      <RegexInput
        label='이메일'
        size='lg'
        name='email'
        type='email'
        placeholder='이메일을 입력해 주세요.'
        errorMessage='이메일 형식을 확인해 주세요.'
        value={email}
        isValid={isEmailValid}
        onChange={handleInputChange}
      />
      <Box my='26px'>
        <RegexInput
          label='비밀번호'
          size='lg'
          name='password'
          type='password'
          placeholder='영문 대소문자, 특수문자(!@#~^*)를 포함해 8자리 이상 입력해야 합니다.'
          errorMessage='영문 대소문자, 특수문자(!@#~^*)를 포함해 8자리 이상 입력해야 합니다.'
          value={password}
          isValid={isPasswordValid}
          onChange={handleInputChange}
        />
      </Box>

      <Flex w='full' justifyContent='space-between' mt='20px'>
        <CustomCheckbox labeltext='아이디 저장' />
        <Flex gap='13px' fontSize='15px'>
          <Link href={INQUIRY_PW_PATH}>
            <Text color='gray.dark'>비밀번호 찾기</Text>
          </Link>
          <Text color='gray.dark'>|</Text>
          <Link href={SIGNUP_TERM_PATH}>
            <Text fontWeight='bold'>회원가입 하기</Text>
          </Link>
        </Flex>
      </Flex>
      <Button size='lg' mt='42px' onClick={onSubmit} isDisabled={isLoginDisabled}>
        로그인
      </Button>

      <Box my='54px'>
        <FormOr />
      </Box>

      <Flex justifyContent='center' gap='29.5px'>
        <Button
          bg='fff'
          border='0.6px solid'
          borderColor='gray.main'
          width='59px'
          height='59px'
          p='10px'
          _hover={{
            bgColor: 'primary.light',
          }}
          onClick={onKakaoLogin}
        >
          <Image width='100%' height='100%' src='/images/kakaotalk_btn.png' alt='kakao logo' />
        </Button>
        <Button
          bg='fff'
          border='0.6px solid'
          borderColor='gray.main'
          width='59px'
          height='59px'
          p='10px'
          _hover={{
            bgColor: 'primary.light',
          }}
        >
          <GithubLogo />
        </Button>
      </Flex>
    </>
  );
}

export default LoginForm;
