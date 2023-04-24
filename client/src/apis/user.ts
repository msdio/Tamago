import { requestWithAuth } from '@/apis';

const USER_PROFILE_URL = '/user/profile';

export const getUserProfile = async () => {
  const res = await requestWithAuth.get(USER_PROFILE_URL);
  console.log('res: ', res);
  return res.data;
};
