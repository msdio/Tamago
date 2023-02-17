import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { CustomCheckbox } from '@/components/common/Checkbox';
import { RightArrow } from '@/icons/RightArrow';

import IconCheckbox from './IconCheckbox';

export default function SignupTerms() {
  const router = useRouter();

  const [checkedTerms, setCheckedTerms] = useState({
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const { age, service, privacy, marketing } = checkedTerms;
  const allChecked = Object.values(checkedTerms).every(Boolean);
  const requiredChecked = age && service && privacy;

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    router.push({ pathname: '/signup/form', query: { termsMarketing: true } }, '/signup/form');
  };

  return (
    <Flex direction='column' w='full' gap='16px'>
      <CustomCheckbox name='all' labelText='모두 동의합니다.' isChecked={allChecked} onChange={handleCheckboxChange} />
      <Divider borderColor='#BFBFBF' />
      <CustomCheckbox
        name='age'
        labelText='[필수] 만 14세 이상입니다.'
        isChecked={age}
        onChange={handleCheckboxChange}
      />
      <IconCheckbox
        name='service'
        labelText='[필수] 서비스 이용약관 동의'
        isChecked={service}
        onChange={handleCheckboxChange}
        icon={<RightArrow />}
      />
      <IconCheckbox
        name='privacy'
        labelText='[필수] 개인정보 수집 및 이용 동의'
        isChecked={privacy}
        onChange={handleCheckboxChange}
        icon={<RightArrow />}
      />
      <IconCheckbox
        name='marketing'
        labelText='[선택] 마케팅 수신 동의'
        isChecked={marketing}
        onChange={handleCheckboxChange}
        icon={<RightArrow />}
      />
      <Button size='lg' type='submit' mt='32px' isDisabled={!requiredChecked} onClick={handleSubmit}>
        동의하고 진행하기
      </Button>
      <Flex gap='14px' justifyContent='center' mt='12px'>
        <Text color='#808080'>이미 가입된 계정이 있으신가요?</Text>
        <Text color='black'>로그인하기</Text>
      </Flex>
    </Flex>
  );
}
