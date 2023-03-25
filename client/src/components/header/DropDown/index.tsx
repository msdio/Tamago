import { Box, Divider, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import { fadeIn } from '@/constants/animations';
import { PRACTICE_LONG_PATH, PRACTICE_SHORT_PATH } from '@/constants/paths';

const longTypingMenus = [
  { menu: '연습타자', path: PRACTICE_LONG_PATH },
  { menu: '실전타자', path: PRACTICE_SHORT_PATH },
];
const shortTypingMenus = [
  { menu: '연습타자', path: PRACTICE_LONG_PATH },
  { menu: '실전타자', path: PRACTICE_SHORT_PATH },
];
const registerMenus = [
  { menu: '긴글', path: '' },
  { menu: '짧은글', path: '' },
  { menu: '업로드', path: '' },
];
const profileMenus = [
  { menu: '수정', path: '' },
  { menu: '통계', path: '' },
];

export default function HeaderDropDown({ handler }: { handler: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      position='absolute'
      left='265px'
      w='438px'
      h='170px'
      background='white.light'
      zIndex='99'
      borderRadius='0 0 20px 20px'
      borderWidth='0.6px'
      borderColor='background.gray'
      borderStyle='solid'
      borderTop='none'
      padding={'31px 42px 39px 42px'}
      onMouseEnter={() => handler(true)}
      onMouseLeave={() => handler(false)}
      animation={`${fadeIn} 0.2s linear`}
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {longTypingMenus.map((el, idx) => (
          <Link key={el.menu + idx} href={el.path}>
            <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
              {el.menu}
            </Text>
          </Link>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {shortTypingMenus.map((el, idx) => (
          <Link key={el.menu + idx} href={el.path}>
            <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
              {el.menu}
            </Text>
          </Link>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {registerMenus.map((el, idx) => (
          <Link key={el.menu + idx} href={el.path}>
            <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
              {el.menu}
            </Text>
          </Link>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {profileMenus.map((el, idx) => (
          <Link key={el.menu + idx} href={el.path}>
            <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
              {el.menu}
            </Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
