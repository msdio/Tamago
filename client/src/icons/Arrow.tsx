import { Icon } from '@chakra-ui/react';

import type { IconProps } from '@/icons/types';

// NOTE : 실제 기본 Icon size는 32x24 (w, h * 4)
export function DownArrow({ w = 8, h = 6, color = '#3F3C3B' }: IconProps) {
  return (
    <Icon width={w} height={h} viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.40782 10.8278C5.33495 7.9315 2.54213 3.79557 1.03686 1.55094C0.592016 0.887595 1.06982 -4.67634e-08 1.86852 -8.16755e-08L14.1648 -6.19162e-07C14.9567 -6.53777e-07 15.4344 0.876695 15.0051 1.54213L9.04347 10.7826C8.6641 11.3707 7.8151 11.3968 7.40782 10.8278Z'
        fill={color}
      />
    </Icon>
  );
}

export function UpArrow() {
  return (
    <Icon width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.40782 1.17224C5.33495 4.0685 2.54213 8.20443 1.03686 10.4491C0.592016 11.1124 1.06982 12 1.86852 12L14.1648 12C14.9567 12 15.4344 11.1233 15.0051 10.4579L9.04347 1.21738C8.6641 0.629349 7.8151 0.603186 7.40782 1.17224Z'
        fill='#3F3C3B'
      />
    </Icon>
  );
}
