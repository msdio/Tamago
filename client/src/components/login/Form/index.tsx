import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

import FormOr from '@/components/common/FormOr';
import RegexInput from '@/components/common/RegexInput';
import useRegexInputs from '@/hooks/useRegexInputs';
import { INQUIRY_PW_PATH } from '@/utils/paths';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

type InputType = {
  email: string;
  password: string;
};

type InputValidType = { email: boolean; password: boolean };

interface LoginFormProps {
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => Promise<void>;
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
    onLogin(email, password);
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
          placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          errorMessage='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          value={password}
          isValid={isPasswordValid}
          onChange={handleInputChange}
        />
      </Box>

      <Flex w='full' justifyContent='space-between' mt='20px'>
        <Checkbox defaultChecked colorScheme='tamago'>
          아이디 저장
        </Checkbox>
        <Flex gap='13px' fontSize='15px'>
          <Link href={INQUIRY_PW_PATH}>
            <Text color='#808080'>비밀번호 찾기</Text>
          </Link>
          <Text color='#808080'>|</Text>
          <Text fontWeight='bold'>회원가입 하기</Text>
        </Flex>
      </Flex>
      <Button size='lg' mt='42px' onClick={onSubmit} isDisabled={isLoginDisabled}>
        로그인
      </Button>

      <Box my='54px'>
        <FormOr />
      </Box>

      <Flex justifyContent='center' gap='29.5px'>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          {/* <Image src={require('../../../assets/icons/google-icon.svg')} alt='google login' width={40} height={38} /> */}
        </Button>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          {/* <Image src={require('../../../assets/icons/github-icon.svg')} alt='github login' width={40} height={38} /> */}
        </Button>
      </Flex>
    </>
  );
}

export default LoginForm;
