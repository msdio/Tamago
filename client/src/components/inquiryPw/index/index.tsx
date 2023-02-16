import { Box, Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Alert from '@/components/common/Alert';
import AuthLayout from '@/components/common/AuthLayout';
import RegexInput from '@/components/common/RegexInput';
import { EMAIL_REGEX } from '@/utils/regex';

interface InquiryPwProps {
  handleNextStep: () => void;
}

export default function InquiryPw({ handleNextStep }: InquiryPwProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    authNumber: '',
  });

  const [isAuthNumberInputWaitStatus, setIsAuthNumberInputWaitStatus] = useState(false);

  const { name, email, authNumber } = inputs;

  const isReceiveAuthNumberDisabled = inputs.email === '' || inputs.name === '';
  const isAuthComplete = inputs.authNumber.length >= 6;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleReceiveAuthNumberButtonClick = () => {
    onOpen();
    setIsAuthNumberInputWaitStatus(true);
  };

  const handleReSendClick = () => {
    handleReceiveAuthNumberButtonClick();
  };

  return (
    <AuthLayout title='비밀번호 찾기' desc='가입하신 이메일을 입력하신 뒤 인증을 완료해 주세요.'>
      <Box mb='26px'>
        <RegexInput
          label='이름'
          size='lg'
          name='name'
          placeholder='이름을 입력해 주세요.'
          value={name}
          onChange={handleInputChange}
        />
      </Box>
      <Flex flexDirection='column' gap={4} mb='57px'>
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

        {isAuthNumberInputWaitStatus ? (
          <Flex gap='14px'>
            <Flex direction='column'>
              <Input
                name='authNumber'
                type='text'
                size='md'
                placeholder='인증번호 입력'
                defaultValue={authNumber}
                onChange={handleInputChange}
              />
            </Flex>
            <Button size='sm' colorScheme='secondary' variant='outline' onClick={handleReSendClick}>
              다시 받기
            </Button>
          </Flex>
        ) : null}
      </Flex>

      {isAuthNumberInputWaitStatus ? (
        <Button
          colorScheme={isAuthComplete ? 'tamago' : 'secondary'}
          size='lg'
          onClick={handleNextStep}
          isDisabled={!isAuthComplete}
        >
          인증 완료
        </Button>
      ) : (
        <Button
          colorScheme='secondary'
          size='lg'
          onClick={handleReceiveAuthNumberButtonClick}
          isDisabled={isReceiveAuthNumberDisabled}
        >
          인증번호 받기
        </Button>
      )}

      <Alert isOpen={isOpen} onClose={onClose}>
        <Box lineHeight='160%'>
          <Text fontWeight='700'>asdf123@naver.com 으로</Text>
          <Text fontWeight='700'>인증메일이 발송되었습니다.</Text>
          <Text mt='6px'>메일이 오지 않는다면 스팸함을 확인해 주세요.</Text>
        </Box>
      </Alert>

      <Flex gap='10px' justifyContent='center' mt='24px'>
        <Text color='#808080'>계정이 없으신가요?</Text>
        <Link href='/signup'>
          <Text>회원가입하기</Text>
        </Link>
      </Flex>
    </AuthLayout>
  );
}
