import { atom } from 'recoil';

import type { UserProfile } from '@/types/user';

export const userProfileState = atom<UserProfile>({
  key: 'userProfile',
  default: undefined,
});
