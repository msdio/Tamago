import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Fonts from '../../../public/fonts/GangwonEduPower';

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  console.log('temp', 'skccc');

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <>
      <Fonts />
      <Flex as='header' direction='row' h='88px' borderBottom='0.6px solid #BFBFBF' p='0 120px' minW='1100px'>
        <Heading fontSize='26px' lineHeight='88px' fontFamily='GangwonEduPower' letterSpacing='.05em'>
          Tamago
        </Heading>
        <HStack spacing='62px' w='100%' marginLeft='81px' fontSize='17px' fontWeight='700'>
          <Text>긴글연습</Text>
          <Text>짧은글연습</Text>
          <Text>글등록</Text>
          <Text>프로필</Text>
        </HStack>
        {!isLogin && (
          <HStack spacing='12.91px' fontSize='14px' lineHeight='17px'>
            <Button
              w='95.54px'
              h='35.29px'
              border='0.516456px solid #BFBFBF'
              borderRadius='4.3038px'
              bg='white'
              onClick={handleSignupClick}
            >
              회원가입
            </Button>
            <Button
              w='95.54px'
              h='35.29px'
              border='0.516456px solid #BFBFBF'
              borderRadius='4.3038px'
              bg='white'
              onClick={handleLoginClick}
            >
              로그인
            </Button>
          </HStack>
        )}
      </Flex>
    </>
  );
}
