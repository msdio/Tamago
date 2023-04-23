import { Box, Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { Tier } from '@/components/common/Tier';
import { TIER_INFO } from '@/constants/tierInfo';
import type { TierLevels } from '@/types/tier';

interface BadgeProps {
  tier: TierLevels;
}

export default function Badge({ tier }: BadgeProps) {
  const tier_info = TIER_INFO[tier];
  const userName = '타마고';
  const tierRating = 13.81;

  return (
    <Flex
      gap='28.29px'
      padding='30px'
      border='0.6px solid'
      borderColor='gray/main'
      w='fit-content'
      bg='white/light'
      borderRadius='10px'
    >
      <Box width='114px' position='relative' height='fit-content'>
        <Center position='absolute' bottom='-13px' w='full' zIndex={-1}>
          <Image src='/images/bottom-shadow.svg' alt='tier shadow' width='96' height='19' />
        </Center>
        <Tier level={tier} />
      </Box>
      <Box>
        <Flex gap='9px'>
          <Text textStyle='point/hd3'>Lv.{tier_info.level}</Text> <Text textStyle='text/medium'>{tier_info.label}</Text>
        </Flex>
        <Flex gap='5px' my='6px' alignItems='center'>
          <Text textStyle='text/Text'>{userName}</Text>
          <Text textStyle='text/medium'>님</Text>
        </Flex>

        <Flex mt='7px' alignItems='center' gap='5px'>
          <Text textStyle='text/Text'>상위</Text>
          <Text textStyle='text/Text' color='primary.dark'>
            {tierRating}%
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
