import { Box, Image, Text } from '@chakra-ui/react';

import { Tier } from '@/components/common/Tier';
import { showScaleUp, wobblyEgg } from '@/constants/animations';
import { TIER_INFO } from '@/constants/tierInfo';
import useCountUp from '@/hooks/useCountUp';
import { getTierLevel } from '@/utils/tier';

interface ScoreInfoProps {
  afterScore: number | null;
  prevScore: number | null;

  isLoading: boolean;
}

export default function ScoreInfo({ isLoading, prevScore, afterScore }: ScoreInfoProps) {
  const score = useCountUp({ start: prevScore ?? 0, end: afterScore ?? 0 });

  if (isLoading) {
    return (
      <Box w={190} textStyle='point/hd2' textAlign='center'>
        <Box position='relative' w='190px' h='175px' overflow='visible'>
          <Image
            src='/images/egg.png'
            alt='egg'
            w='120px'
            margin='auto'
            animation={`${wobblyEgg} 1s infinite linear`}
          />
        </Box>

        <Text fontSize='20px' fontWeight={400} mt='9px' textStyle='point/hd3'>
          Lv.0
        </Text>
        <Text fontSize='16px' fontWeight={500}>
          egg
        </Text>
        <Text mt='13px' fontSize='26px' fontWeight={400} textStyle='point/hd2'>
          0점
        </Text>
      </Box>
    );
  }

  const tier = getTierLevel(afterScore ?? 0);
  const { level, text, label } = TIER_INFO[tier];

  return (
    <Box w={190} textStyle='point/hd2' textAlign='center'>
      <Box position='relative' overflow='visible'>
        <Box animation={`${showScaleUp} 1s ease`} w='fit-content' margin='auto'>
          <Tier level={level} />
        </Box>
      </Box>
      {/* GangwonEduPower 적용이 안될까요.. */}
      <Text fontSize='20px' fontWeight={400} mt='9px' textStyle='point/hd3'>
        {text}
      </Text>
      <Text fontSize='16px' fontWeight={500}>
        {label}
      </Text>
      <Text mt='13px' fontSize='26px' fontWeight={400} textStyle='point/hd2'>
        {score}점
      </Text>
    </Box>
  );
}
