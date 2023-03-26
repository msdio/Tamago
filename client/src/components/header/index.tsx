import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LOGIN_PATH, SIGNUP_TERM_PATH } from '@/constants/paths';
import { TamagoLogo } from '@/icons/TamagoLogo';

import HeaderDropDown from './DropDown';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const router = useRouter();

  const onRouting = (to: string) => {
    router.push(to);
  };

  const onLoginClick = () => {
    onRouting(LOGIN_PATH);
    setIsLogin(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Flex
        as='header'
        position='relative'
        justifyContent='space-between'
        h='88px'
        minH='88px'
        borderBottom='0.6px solid'
        borderColor='gray.main'
        p='0 120px'
        minW='1100px'
        alignItems='center'
        zIndex='100'
        background='white.light'
      >
        <Flex h='100%' alignItems='center'>
          <Link href='/'>
            <TamagoLogo />
          </Link>
          <HStack
            spacing='46px'
            w='fit-content'
            h='100%'
            marginLeft='81px'
            fontSize='17px'
            fontWeight='700'
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
            cursor='pointer'
          >
            <Text>긴글연습</Text>
            <Text>짧은글연습</Text>
            <Text>글등록</Text>
            <Text>프로필</Text>
          </HStack>
        </Flex>
        {!isLogin && (
          <HStack spacing='12.91px'>
            <Button
              variant='outline'
              colorScheme='gray'
              w='95.54px'
              h='35.29px'
              border='0.516456px solid'
              borderColor='gray.main'
              borderRadius='4.3038px'
              bg='white.light'
              onClick={() => onRouting(SIGNUP_TERM_PATH)}
              color='black.dark'
              fontSize='14px'
              lineHeight='17px'
            >
              회원가입
            </Button>
            <Button
              variant='outline'
              colorScheme='gray'
              w='95.54px'
              h='35.29px'
              border='0.516456px solid'
              borderColor='gray.main'
              borderRadius='4.3038px'
              bg='white.light'
              color='black.dark'
              onClick={onLoginClick}
              fontSize='14px'
              lineHeight='17px'
            >
              로그인
            </Button>
          </HStack>
        )}
      </Flex>
      {showDropDown && <HeaderDropDown handler={setShowDropDown} />}
    </div>
  );
}
