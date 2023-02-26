import { Flex, Icon } from '@chakra-ui/react';

import { bouncingDown, bouncingUp } from '@/constants/animations';

const TopIndicator = () => (
  <Icon
    viewBox='0 0 18 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    fontSize='24px'
    marginBottom='5px'
    animation={bouncingUp + ' 1s infinite ease-in'}
  >
    <rect x='1' y='1' width='16' height='28' rx='8' stroke='black' strokeWidth='2' />
    <circle cx='9' cy='10' r='3' fill='black' />
  </Icon>
);

const BottomIndicator = () => (
  <Icon
    viewBox='0 0 12 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    fontSize='10px'
    animation={bouncingDown + ' 1s infinite ease-in'}
  >
    <path d='M1 1L6 5L11 1' stroke='black' strokeWidth='2' strokeLinecap='round' />
  </Icon>
);

export const ScrollIndicator = () => (
  <Flex
    position='absolute'
    bottom='2%'
    flexDirection='column'
    margin='auto'
    alignItems='center'
    justifyContent='center'
  >
    <TopIndicator />
    <BottomIndicator />
  </Flex>
);
