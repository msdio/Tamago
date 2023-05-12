import { Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
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
      <MenuButton
        fontWeight={'500'}
        w={'96px'}
        h={'34px'}
        border={'0.6px solid #101010'}
        borderRadius={16}
        bg={'background.white'}
      >
        <Flex alignItems={'center'} justify={'center'} gap={'15px'}>
          정렬
          <UpDownArrow />
        </Flex>
      </MenuButton>
      <MenuList p={0} minW={0} w={'96px'} border={'0.6px solid #101010'} borderRadius={16} bg={'background.white'}>
        {sortByItems.map((item, index, items) => (
          <>
            <Link key={index} href={item.path}>
              <MenuItem
                _hover={{ color: 'primary.dark' }}
                fontWeight={'500'}
                w={'fit-content'}
                bg={'background.white'}
                p={0}
                m={'15px 18px'}
              >
                {item.label}
              </MenuItem>
            </Link>
            {index !== items.length - 1 && <MenuDivider />}
          </>
        ))}
      </MenuList>
    </Menu>
  );
}
