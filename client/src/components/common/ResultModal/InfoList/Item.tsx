import { Flex, Text } from '@chakra-ui/react';

export default function InfoItem({
  label,
  content,
  isDarkBg,
}: {
  label: string;
  content: string | number;
  isDarkBg?: boolean;
}) {
  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      bg={isDarkBg ? 'white.dark' : 'white.light'}
      borderRadius='10px'
      px='28px'
      h='48px'
    >
      <Text fontWeight={500} fontSize='16px'>
        {label}
      </Text>
      <Text fontFamily={'GangwonEduPower'} fontSize={20} fontWeight={900}>
        {content}
      </Text>
    </Flex>
  );
}
