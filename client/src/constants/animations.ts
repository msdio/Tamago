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

export const cardUp = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-10px);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const jumping = keyframes`
  0% {
    transform: scale(1, 1) translateY(0) rotate(0deg);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0) rotate(3deg);
  }
  30% { 
    transform: scale(0.9, 1.1) translateY(-100px) rotate(10deg);
  }
  50% { 
    transform: scale(1.05, 0.95) translateY(0) rotate(15deg);
  }
  60% { 
    transform: scale(1, 1) translateY(-7px) rotate(0deg); 
  }
  70% { 
    transform: scale(1, 1) translateY(0) rotate(0deg); 
  }
  100% { 
    transform: scale(1, 1) translateY(0) rotate(0deg); 
  }
`;

export const jumpingShadow = keyframes`
  0% {
    transform: scale(1) translateX(1.5625rem);
  }
  30% {
    transform: scale(0.6, 1) translateX(1.5625rem);
  }
  60% {
    transform: scale(1) translateX(1.5625rem);
  }
  100% {
    transform: scale(1) translateX(1.5625rem);
  }
`;

export const speechBubbleShake = keyframes`
  0% {  
     transform: rotate(0deg);
  }
  25% {   
    transform: rotate(-2deg);
  }
  50% {  
    transform: rotate(0deg); 
  }
  75% {  
    transform: rotate(-2deg);
  }
  100% {   
    transform: rotate(0deg); 
  }
`;
