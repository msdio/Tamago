import { Box, Divider, Text } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';

import { fadeIn } from '@/constants/animations';

const longTypingMeuns = ['연습타자', '실전타자'];
const shortTypingMeuns = ['연습타자', '실전타자'];
const registerMenus = ['긴글', '짧은글', '업로드'];
const profileMenus = ['수정', '통계'];

export function HeaderDropDown({ handler }: { handler: Dispatch<SetStateAction<boolean>> }) {
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
        {longTypingMeuns.map((el, idx) => (
          <Text key={el + idx} cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
            {el}
          </Text>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {shortTypingMeuns.map((el, idx) => (
          <Text key={el + idx} cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
            {el}
          </Text>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {registerMenus.map((el, idx) => (
          <Text key={el + idx} cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
            {el}
          </Text>
        ))}
      </Box>

      <Divider orientation='vertical' />

      <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
        {profileMenus.map((el, idx) => (
          <Text key={el + idx} cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
            {el}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
