import { Flex, FormLabel } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { EMAIL_BUTTON_THEME } from '../../constants/theme';
import InputForm from '../util/InputForm';
import SubmitButton from '../util/SubmitButton';

export default function SignupForm() {
  const [signupInputs, setSignupInputs] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleInputChange = (setValue: Dispatch<SetStateAction<string>>) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
  };

  return (
    <Flex direction='column'>
      <Flex direction='column' gap='8px' mb='26px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이름
        </FormLabel>
        <InputForm placeholder='이름을 입력해 주세요.' value={name} onChange={handleInputChange(setName)} />
      </Flex>
      <Flex direction='column' gap='8px' mb='37px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          이메일
        </FormLabel>
        <Flex gap='13px'>
          <InputForm
            w='351px'
            type='email'
            placeholder='이메일을 입력해 주세요.'
            regex={/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
            errorMessage='이메일 형식을 확인해 주세요.'
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <SubmitButton w='122px' colorScheme='emailButton' theme={EMAIL_BUTTON_THEME}>
            중복 확인
          </SubmitButton>
        </Flex>
      </Flex>
      <Flex direction='column' gap='8px' mb='41px'>
        <FormLabel fontSize='15px' fontWeight='700'>
          비밀번호
        </FormLabel>
        <Flex direction='column' gap='16px'>
          <InputForm
            type='password'
            placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
            regex={/^(?=.*[A-Za-z])(?=.*\d).{8,12}$/}
            errorMessage='8-12자 영문, 숫자를 사용해 주세요.'
            value={password}
            onChange={handleInputChange(setPassword)}
          />
          <InputForm
            type='password'
            placeholder='비밀번호를 한 번 더 입력해 주세요.'
            regex={new RegExp(`^${password}$`)}
            errorMessage='비밀번호가 일치하지 않습니다.'
            value={verifyPassword}
            onChange={handleInputChange(setVerifyPassword)}
          />
        </Flex>
      </Flex>
      <SubmitButton type='submit' colorScheme='tamago'>
        회원가입
      </SubmitButton>
    </Flex>
  );
}
