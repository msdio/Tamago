import { Box, Image, Text } from '@chakra-ui/react';

import { Tier } from '@/components/common/Tier';
import { showScaleUp, wobblyEgg } from '@/constants/animations';
import { TIER_INFO } from '@/constants/tierInfo';
import { getTierLevel } from '@/utils/tier';

interface ScoreInfoProps {
  score: number | null;
}

export default function ScoreInfo({ score }: ScoreInfoProps) {
  const isLoading = score === null;

  if (isLoading) {
    return (
      <Box w={190} fontFamily='GangwonEduPower' textAlign='center'>
        <Box position='relative' w='190px' h='175px' overflow='visible'>
          <Image
            src='/images/egg.png'
            alt='egg'
            w='120px'
            margin='auto'
            animation={`${wobblyEgg} 1s infinite linear`}
          />
        </Box>

        <Text fontSize='20px' fontWeight={400} mt='9px' fontFamily='GangwonEduPower'>
          Lv.0
        </Text>
        <Text fontSize='16px' fontWeight={500}>
          egg
        </Text>
        <Text mt='13px' fontSize='26px' fontWeight={400} fontFamily='GangwonEduPower'>
          0점
        </Text>
      </Box>
    );
  }

  const tier = getTierLevel(score);
  const { level, text, label } = TIER_INFO[tier];

  return (
    <Box w={190} fontFamily='GangwonEduPower' textAlign='center'>
      <Box position='relative' w='190px' h='175px' overflow='visible'>
        <Box animation={`${showScaleUp} 1s ease`} w='fit-content'>
          <Tier level={level} />
        </Box>
      </Box>
      {/* GangwonEduPower 적용이 안될까요.. */}
      <Text fontSize='20px' fontWeight={400} mt='9px' fontFamily='GangwonEduPower'>
        {text}
      </Text>
      <Text fontSize='16px' fontWeight={500}>
        {label}
      </Text>
      <Text mt='13px' fontSize='26px' fontWeight={400} fontFamily='GangwonEduPower'>
        {score}점
      </Text>
    </Box>
  );
}
