import { keyframes } from '@emotion/react';

export const bouncingUp = keyframes`
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2px);
  }
`;

export const bouncingDown = keyframes`
  0% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px)
  }
`;

export const cardShadow = keyframes`
  from {
    box-shadow: 8px 10px gray;
  }
  to {
    box-shadow: 13px 15px orange;
  }
`;
