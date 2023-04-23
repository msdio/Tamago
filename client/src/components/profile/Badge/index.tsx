import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { Tier } from '@/components/common/Tier';
import { TIER_INFO } from '@/constants/tierInfo';
import type { TierLevels } from '@/types/tier';

interface BadgeProps {
  tier: TierLevels;
}

const TierWrapper = styled.div`
  width: 114px;
  text-align: center;

  img {
    margin: auto;
  }
`;

const LevelWrapper = styled.div`
  /* b {
    font-family: 'GangwonEduPower';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 21px;
    /* identical to box height */

    text-align: center;

    color: #000000;
  } */
`;

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
      <TierWrapper>
        <Tier level={tier} />
        <Image src='/images/bottom-shadow.svg' alt='tier shadow' width='96' height='19' />
      </TierWrapper>
      <Box>
        <Flex gap='9px'>
          <Text textStyle='point/hd3'>Lv.{tier_info.level}</Text> <Text textStyle='text/medium'>{tier_info.label}</Text>
        </Flex>
        <Box my='6px'>{userName}님</Box>

        <Box mt='7px'>상위 {tierRating}%</Box>
      </Box>
    </Flex>
  );
}
