import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Link from 'next/link';

import { PRACTICE_LONG_PATH_LIST } from '@/constants/paths';
import UpDownArrow from '@/icons/UpDownArrow';

const sortByItems = [
  {
    label: '최신순',
    path: `${PRACTICE_LONG_PATH_LIST}?page=1&sortBy=latest`,
  },
  {
    label: '조회수순',
    path: `${PRACTICE_LONG_PATH_LIST}?page=1&sortBy=viewCount`,
  },
  {
    label: '오래된순',
    path: `${PRACTICE_LONG_PATH_LIST}?page=1&sortBy=oldest`,
  },
];

export default function SortBy() {
  return (
    <Menu>
      <MenuButton w={'96px'} h={'34px'} border={'0.6px solid #101010'} borderRadius={16} bg={'#fafafa'}>
        <Flex alignItems={'center'} justify={'center'} gap={'15px'}>
          <b>정렬</b>
          <UpDownArrow />
        </Flex>
      </MenuButton>
      <MenuList>
        {sortByItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <MenuItem>{item.label}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}
