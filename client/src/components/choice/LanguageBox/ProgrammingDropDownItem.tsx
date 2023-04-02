import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface ProgrammingDropDownItemProps {
  content: string;
  path: string;
}

export default function ProgrammingDropDownItem({ content, path }: ProgrammingDropDownItemProps) {
  return (
    <Link href={path}>
      <Box
        w='100%'
        h='58px'
        textAlign='center'
        _hover={{
          bg: 'white.dark',
        }}
      >
        <Text fontSize='25px' lineHeight='58px' fontWeight={600} color='black.light'>
          {content}
        </Text>
      </Box>
    </Link>
  );
}
