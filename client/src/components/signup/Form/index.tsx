import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { emailDuplicateAPI, signupAPI } from '@/apis/auth';
import { EmailDuplicateError, NicknameDuplicateError, ServerError } from '@/apis/error';
import Alert from '@/components/common/Alert';
import FormOr from '@/components/common/FormOr';
import RegexInput from '@/components/common/RegexInput';
import useRegexInputs from '@/hooks/useRegexInputs';
import { SIGNUP_COMPLETE_PATH } from '@/utils/paths';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

import EmailInput from './EmailInput';

export default function SignupForm() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(true);

  const [inputs, valids, handleInputChange] = useRegexInputs({
    name: /./,
    email: EMAIL_REGEX,
    password: PASSWORD_REGEX,
    verifyPassword: /./,
  });

  /**
   * 회원가입시 유효하지 않은 input으로 포커싱
   */
  const inputRef = useRef<Record<string, HTMLInputElement | null>>({
    name: null,
    email: null,
    password: null,
    verifyPassword: null,
  });

  /**
   * 각 input의 값과 유효성을 모두 가지고 있는 객체
   */
  const inputInfo = Object.keys(inputs).reduce((prev, curr) => {
    prev[curr] = {
      value: inputs[curr],
      isValid: curr === 'verifyPassword' ? inputs['password'] === inputs['verifyPassword'] : valids[curr],
    };
    return prev;
  }, {} as Record<string, { value: string; isValid: boolean }>);

  const { name, email, password, verifyPassword } = inputInfo;

  const handleEmailDuplicate = async () => {
    try {
      await emailDuplicateAPI(email.value);
      setIsEmailDuplicated(true);
      onOpen();
    } catch (error) {
      if (error instanceof EmailDuplicateError) {
        setIsEmailDuplicated(false);
        onOpen();
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleSignup = async () => {
    const notValidInput = Object.entries(inputInfo).find(([, { isValid }]) => !isValid);
    if (notValidInput) {
      const [input] = notValidInput;
      inputRef.current[input]?.focus();
    } else if (isEmailDuplicated) {
      onOpen();
    } else {
      try {
        await signupAPI(email.value, name.value, password.value);
        router.push(SIGNUP_COMPLETE_PATH);
      } catch (error) {
        if (error instanceof EmailDuplicateError) {
          alert(error.message);
        } else if (error instanceof NicknameDuplicateError) {
          alert(error.message);
        } else if (error instanceof ServerError) {
          alert(error.message);
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <>
      <Flex direction='column'>
        <Box mb='25px'>
          <RegexInput
            label='이름'
            size='lg'
            name='name'
            placeholder='이름을 입력해 주세요.'
            value={name.value}
            isValid={name.isValid}
            onChange={handleInputChange}
            ref={(el) => (inputRef.current['name'] = el)}
          />
        </Box>
        <Box mb='26px'>
          <EmailInput
            label='이메일'
            size='md'
            name='email'
            type='email'
            placeholder='이메일을 입력해 주세요.'
            errorMessage='이메일 형식을 확인해 주세요.'
            value={email.value}
            isValid={email.isValid}
            onChange={handleInputChange}
            onClick={handleEmailDuplicate}
            buttonText='중복 확인'
            ref={(el) => (inputRef.current['email'] = el)}
          />
        </Box>
        <Box mb='16px'>
          <RegexInput
            label='비밀번호'
            size='lg'
            name='password'
            type='password'
            placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            errorMessage='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            value={password.value}
            isValid={password.isValid}
            onChange={handleInputChange}
            ref={(el) => (inputRef.current['password'] = el)}
          />
        </Box>
        <Box mb='57px'>
          <RegexInput
            size='lg'
            name='verifyPassword'
            type='password'
            placeholder='비밀번호를 한 번 더 입력해 주세요.'
            errorMessage='비밀번호가 일치하지 않습니다.'
            value={verifyPassword.value}
            isValid={verifyPassword.isValid}
            onChange={handleInputChange}
            ref={(el) => (inputRef.current['verifyPassword'] = el)}
          />
        </Box>
        <Button size='lg' onClick={handleSignup}>
          회원가입 하기
        </Button>
        <Box m='41px 0px'>
          <FormOr />
        </Box>
        <Flex justifyContent='center' gap={4}>
          <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
            <Image src='/images/google-icon.svg' alt='google login' width={40} height={38} />
          </Button>
          <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
            <Image src='/images/github-icon.svg' alt='google login' width={40} height={38} />
          </Button>
        </Flex>
      </Flex>
      <Alert isOpen={isOpen} onClose={onClose}>
        <Box textAlign='center' mt='34px' mb='54px'>
          <Text fontWeight='700'>
            {isEmailDuplicated ? '이미 사용 중인 이메일 입니다.' : '사용 가능한 이메일 입니다.'}
          </Text>
        </Box>
      </Alert>
    </>
  );
}
