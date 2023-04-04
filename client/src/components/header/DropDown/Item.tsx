import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import PrepareAlert from '@/components/common/PrepareAlert';
import useToggle from '@/hooks/useToggle';

interface MenuType {
  menu: string;
  path: string;
}

interface DropDownItemProps {
  menus: MenuType[];
}

export default function DropDownItem({ menus }: DropDownItemProps) {
  const [isModalOpen, handleModalOpen] = useToggle();

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
      {menus.map((el, idx) =>
        el.path === 'prepare' ? (
          <Text
            key={el.menu + idx}
            cursor='pointer'
            fontWeight='500'
            fontSize='17px'
            _hover={{ color: 'primary.main' }}
            onClick={handleModalOpen}
          >
            {el.menu}
          </Text>
        ) : (
          <Link key={el.menu + idx} href={el.path}>
            <Text cursor='pointer' fontWeight='500' fontSize='17px' _hover={{ color: 'primary.main' }}>
              {el.menu}
            </Text>
          </Link>
        ),
      )}

      <PrepareAlert isOpen={isModalOpen} onClose={handleModalOpen} />
    </Box>
  );
}
