import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface MenuType {
  menu: string;
  path: string;
}

interface DropDownItemProps {
  menus: MenuType[];
}

// TODO : 완료가 되지 않은 페이지는 "준비중입니다" 추가하면 좋을 것 같습니다.
export default function DropDownItem({ menus }: DropDownItemProps) {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
      {menus.map((el, idx) => (
        <Link key={el.menu + idx} href={el.path}>
          <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
            {el.menu}
          </Text>
        </Link>
      ))}
    </Box>
  );
}
