import { Icon } from '@chakra-ui/react';

export const RightArrowWithCircle = () => (
  <Icon viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg' fontSize='45px' cursor='pointer'>
    <circle cx='22.5' cy='22.5' r='22' fill='white' stroke='black' />
    <path
      d='M28.125 18L31.5 22.5M31.5 22.5L28.125 27M31.5 22.5L13.5 22.5'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Icon>
);
