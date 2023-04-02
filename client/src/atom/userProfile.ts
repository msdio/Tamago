import { atom } from 'recoil';

import type { UserProfile } from '@/types/user';

export const userProfileState = atom<UserProfile | null>({
  key: 'userProfile',
  default: null,
});
