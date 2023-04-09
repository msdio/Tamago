import { Box, Divider } from '@chakra-ui/react';

import DropDownItem from '@/components/header/DropDown/Item';
import { fadeIn } from '@/constants/animations';
import { EXAM_LONG_PATH_CHOICE, PRACTICE_LONG_PATH_LIST, PRACTICE_SHORT_CHOICE_PATH } from '@/constants/paths';

const longTypingMenus = [
  { menu: '연습타자', path: PRACTICE_LONG_PATH_LIST },
  { menu: '실전타자', path: EXAM_LONG_PATH_CHOICE },
];
const shortTypingMenus = [
  { menu: '연습타자', path: PRACTICE_SHORT_CHOICE_PATH },
  { menu: '실전타자', path: 'prepare' },
];
const registerMenus = [
  { menu: '긴글', path: 'register' },
  { menu: '짧은글', path: 'prepare' },
  { menu: '업로드', path: 'prepare' },
];
const profileMenus = [
  { menu: '수정', path: 'prepare' },
  { menu: '통계', path: 'prepare' },
];

export default function HeaderDropDown({ handler }: { handler: (a: boolean) => void }) {
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
      <DropDownItem menus={longTypingMenus} />
      <Divider orientation='vertical' />
      <DropDownItem menus={shortTypingMenus} />
      <Divider orientation='vertical' />
      <DropDownItem menus={registerMenus} />
      <Divider orientation='vertical' />
      <DropDownItem menus={profileMenus} />
    </Box>
  );
}
