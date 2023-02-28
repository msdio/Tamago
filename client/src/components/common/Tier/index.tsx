import { Image } from '@chakra-ui/react';

interface Levels {
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

const tiersMap = {
  0: <Image src='/images/tiers/tier-zero.png' alt='tier 0' h='85%' objectFit='cover' />,
  1: <Image src='/images/tiers/tier-one.png' alt='tier 1' h='85%' objectFit='cover' />,
  2: <Image src='/images/tiers/tier-two.png' alt='tier 2' h='100%' objectFit='cover' />,
  3: <Image src='/images/tiers/tier-three.png' alt='tier 3' w='100%' objectFit='cover' />,
  4: <Image src='/images/tiers/tier-four.png' alt='tier 4' w='100%' objectFit='cover' />,
  5: <Image src='/images/tiers/tier-five.png' alt='tier 5' w='100%' objectFit='cover' />,
};

export const Tier = ({ level }: Levels) => <>{tiersMap[level]}</>;

export const AllTiers = () => <>{Object.values(tiersMap)}</>;
