import { Box, Button, Checkbox, Divider, Flex, Img, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface SignupLayoutProps {
  setAgreeTerms: (agreeTerms: boolean) => void;
}

export default function SignupTerms({ setAgreeTerms }: SignupLayoutProps) {
  const [checkedTerms, setCheckedTerms] = useState({
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const { age, service, privacy, marketing } = checkedTerms;
  const allChecked = Object.values(checkedTerms).every(Boolean);
  const requiredChecked = age && service && privacy;

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (name === 'all') {
      setCheckedTerms({ age: checked, service: checked, privacy: checked, marketing: checked });
      return;
    }
    setCheckedTerms({
      ...checkedTerms,
      [name]: e.target.checked,
    });
  };

  const onSubmit = () => {
    setAgreeTerms(requiredChecked);
  };

  return (
    <Flex direction='column' w='full' gap='26px'>
      <Box w='full'>
        <Checkbox name='all' fontSize='15px' fontWeight='700' isChecked={allChecked} onChange={onCheckboxChange}>
          모두 동의합니다.
        </Checkbox>
      </Box>
      <Divider borderColor='#BFBFBF' />
      <Box w='full'>
        <Checkbox name='age' fontSize='15px' isChecked={age} onChange={onCheckboxChange}>
          [필수] 만 14세 이상입니다.
        </Checkbox>
      </Box>
      <Flex w='full' alignItems='center' justify='space-between'>
        <Checkbox name='service' fontSize='15px' isChecked={service} onChange={onCheckboxChange}>
          [필수] 서비스 이용약관 동의
        </Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' verticalAlign='middle' />
      </Flex>
      <Flex w='full' alignItems='center' justify='space-between'>
        <Checkbox name='privacy' fontSize='15px' isChecked={privacy} onChange={onCheckboxChange}>
          [필수] 개인정보 수집 및 이용 동의
        </Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' />
      </Flex>
      <Flex w='full' alignItems='center' justify='space-between' mb='43px'>
        <Checkbox name='marketing' fontSize='15px' isChecked={marketing} onChange={onCheckboxChange}>
          [선택] 마케팅 수신 동의
        </Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' />
      </Flex>
      <Button size='lg' type='submit' isDisabled={!requiredChecked} onClick={onSubmit}>
        동의하고 진행하기
      </Button>
      <Flex gap='14px' justifyContent='center'>
        <Text color='#808080'>이미 가입된 계정이 있으신가요?</Text>
        <Text color='black'>로그인하기</Text>
      </Flex>
    </Flex>
  );
}
