import { AxiosError } from 'axios';

import { requestWithAuth, requestWithoutAuth } from '@/apis';
import type { ApiResponse } from '@/types/apiResponse';
import type { UserProfile } from '@/types/user';

import { ServerError } from './error';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';
const USER_PROFILE = '/user/profile';

interface AuthAPIParams {
  email: string;
  password: string;
  nickname?: string;
}

export const loginAPI = async ({ email, password }: AuthAPIParams): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.post(LOGIN_PATH, { email, password });

  window.localStorage.setItem('accessToken', data.result.accessToken);

  return data;
};

export const signupAPI = async ({ email, password, nickname }: AuthAPIParams): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.post(SIGNUP_PATH, { email, nickname, password });

  return data;
};

export const emailDuplicateAPI = async (email: string): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.get(EMAIL_DUPLICATE_PATH, { params: { email } });

  return data;
};

export const getUserProfileAPI = async (): Promise<UserProfile> => {
  try {
    const { data } = await requestWithAuth.get(USER_PROFILE);

    const { code, result } = data as ApiResponse;

    if (code !== 1000) {
      throw new Error('잘못된 토큰입니다.');
    }

    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { code } = error.response?.data;
      if (code === 500) {
        throw new ServerError();
      }
    }
    return await Promise.reject(error);
  }
};

export const kakaoLoginAPI = () => {
  location.replace(`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/kakao`);
};
