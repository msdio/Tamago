import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { CustomCheckbox } from '@/components/common/Checkbox';
import { RightArrow } from '@/icons/RightArrow';
import { LOGIN_PATH, SIGNUP_FORM_PATH } from '@/utils/paths';

export default function SignupTerms() {
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

  return (
    <Flex direction='column' w='full' gap='16px'>
      <CustomCheckbox name='all' labelText='모두 동의합니다.' isChecked={allChecked} onChange={handleCheckboxChange} />
      <Divider borderColor='gray.main' />
      <CustomCheckbox
        name='age'
        labelText='[필수] 만 14세 이상입니다.'
        isChecked={age}
        onChange={handleCheckboxChange}
      />
      <Flex alignItems='center' justify='space-between'>
        <CustomCheckbox
          name='service'
          labelText='[필수] 서비스 이용약관 동의'
          isChecked={service}
          onChange={handleCheckboxChange}
        />
        <RightArrow />
      </Flex>
      <Flex alignItems='center' justify='space-between'>
        <CustomCheckbox
          name='privacy'
          labelText='[필수] 서비스 이용약관 동의'
          isChecked={privacy}
          onChange={handleCheckboxChange}
        />
        <RightArrow />
      </Flex>
      <Flex alignItems='center' justify='space-between'>
        <CustomCheckbox
          name='marketing'
          labelText='[필수] 서비스 이용약관 동의'
          isChecked={marketing}
          onChange={handleCheckboxChange}
        />
        <RightArrow />
      </Flex>
      <Link
        href={{
          pathname: SIGNUP_FORM_PATH,
          query: { termsMarketing: true },
        }}
      >
        <Button size='lg' type='submit' mt='32px' isDisabled={!requiredChecked}>
          동의하고 진행하기
        </Button>
      </Link>
      <Flex gap='14px' justifyContent='center' mt='12px'>
        <Text color='gray.dark'>이미 가입된 계정이 있으신가요?</Text>
        <Link href={LOGIN_PATH}>
          <Text color='black.dark'>로그인하기</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
