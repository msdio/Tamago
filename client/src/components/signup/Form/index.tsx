import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { emailDuplicateAPI, signupAPI } from '@/apis/auth';
import Alert from '@/components/common/Alert';
import FormOr from '@/components/common/FormOr';
import RegexInput from '@/components/common/RegexInput';
import EmailInput from '@/components/signup/Form/EmailInput';
import { SIGNUP_COMPLETE_PATH } from '@/constants/paths';
import { RESPONSE_CODE } from '@/constants/responseCode';
import useRegexInputs from '@/hooks/useRegexInputs';
import useToggle from '@/hooks/useToggle';
import { GithubLogo } from '@/icons/GithubLogo';
import { GoogleLogo } from '@/icons/GoogleLogo';
import type { ApiErrorResponse } from '@/types/apiResponse';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

export default function SignupForm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(true);
  const [alertMessage, setAlertMessage] = useState('알 수 없는 에러입니다.');

  const [isModalOpen, toggleModalOpen, { toggleOn, toggleOff }] = useToggle();

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
      const data = await emailDuplicateAPI(email.value);

      if (data.code === RESPONSE_CODE.SUCCESS) {
        setIsEmailDuplicated(false);
      } else if (data.code === RESPONSE_CODE.EMAIL_DUPLICATE) {
        setIsEmailDuplicated(true);
      }

      onOpen();
    } catch (error) {
      const customError = error as ApiErrorResponse;

      setAlertMessage(customError.description);
      toggleOn();
    }
  };

  const handleSignup = async () => {
    if (isEmailDuplicated) {
      onOpen();
      return;
    }

    const notValidInput = Object.entries(inputInfo).find(([, { isValid }]) => !isValid);
    if (notValidInput) {
      const [input] = notValidInput;
      inputRef.current[input]?.focus();
      return;
    }

    try {
      const data = await signupAPI({ nickname: name.value, email: email.value, password: password.value });

      if (data.code === RESPONSE_CODE.SUCCESS) {
        router.push(SIGNUP_COMPLETE_PATH);
      } else if (data.code === RESPONSE_CODE.EMAIL_DUPLICATE) {
        setAlertMessage(data.description);
        toggleOn();
      } else if (data.code === RESPONSE_CODE.NICKNAME_DUPLICATE) {
        setAlertMessage(data.description);
        toggleOn();
      }
    } catch (error) {
      const customError = error as ApiErrorResponse;

      setAlertMessage(customError.description);
      toggleOn();
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
        <Button size='lg' onClick={handleSignup} isDisabled={isEmailDuplicated}>
          회원가입 하기
        </Button>
        <Box m='41px 0px'>
          <FormOr />
        </Box>
        <Flex justifyContent='center' gap={4}>
          <Button bg='fff' border='0.6px solid' borderColor='gray.main' width='59px' height='59px' p='10px'>
            <GoogleLogo />
          </Button>
          <Button bg='fff' border='0.6px solid' borderColor='gray.main' width='59px' height='59px' p='10px'>
            <GithubLogo />
          </Button>
        </Flex>
      </Flex>
      <Alert
        header={isEmailDuplicated ? '이미 사용 중인 이메일 입니다.' : '사용 가능한 이메일 입니다.'}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Alert header={alertMessage} isOpen={isModalOpen} onClose={toggleOff} />
    </>
  );
}
