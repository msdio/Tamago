import { Image } from '@chakra-ui/react';

interface TiersProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

const tiersMap = {
  0: <Image src='/images/tiers/tier-zero.png' alt='tier 0' w='68px' h='116.9px' />,
  1: <Image src='/images/tiers/tier-one.png' alt='tier 1' w='114.3px' h='143px' />,
  2: <Image src='/images/tiers/tier-two.png' alt='tier 2' w='114.3px' h='166px' />,
  3: <Image src='/images/tiers/tier-three.png' alt='tier 3' w='172.7px' h='172px' />,
  4: <Image src='/images/tiers/tier-four.png' alt='tier 4' w='172.7px' h='165.6px' />,
  5: <Image src='/images/tiers/tier-five.png' alt='tier 5' w='180.68px' h='175.75px' />,
};

export const Tier = ({ level }: TiersProps) => <>{tiersMap[level]}</>;

export const AllTiers = () => <>{Object.values(tiersMap)}</>;
