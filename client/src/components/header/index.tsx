import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { TamagoLogo } from '@/icons/TamagoLogo';

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    router.push('/signup/terms');
  };

  return (
    <>
      <Flex
        as='header'
        direction='row'
        h='88px'
        minH='88px'
        borderBottom='0.6px solid #BFBFBF'
        p='0 120px'
        minW='1100px'
        alignItems='center'
        zIndex='100'
        background='white'
      >
        <Link href='/'>
          <TamagoLogo />
        </Link>
        <HStack spacing='62px' w='100%' marginLeft='81px' fontSize='17px' fontWeight='700'>
          <Text>긴글연습</Text>
          <Text>짧은글연습</Text>
          <Text>글등록</Text>
          <Text>프로필</Text>
        </HStack>
        {!isLogin && (
          <HStack spacing='12.91px'>
            <Button
              w='95.54px'
              h='35.29px'
              border='0.516456px solid #BFBFBF'
              borderRadius='4.3038px'
              bg='white'
              onClick={handleSignupClick}
              color='black'
              fontSize='14px'
              lineHeight='17px'
            >
              회원가입
            </Button>
            <Button
              w='95.54px'
              h='35.29px'
              border='0.516456px solid #BFBFBF'
              borderRadius='4.3038px'
              bg='white'
              color='black'
              onClick={handleLoginClick}
              fontSize='14px'
              lineHeight='17px'
            >
              로그인
            </Button>
          </HStack>
        )}
      </Flex>
    </>
  );
}
