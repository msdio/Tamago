import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface CodeDropDownItemProps {
  content: string;
  path: string;
}

export default function CodeDropDownItem({ content, path }: CodeDropDownItemProps) {
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
