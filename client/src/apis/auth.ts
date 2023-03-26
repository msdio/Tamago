import { AxiosError } from 'axios';

import { requestWithAuth, requestWithoutAuth } from '@/apis';
import type { ApiResponse } from '@/types/apiResponse';
import type { UserProfile } from '@/types/user';

import { ServerError } from './error';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';
const USER_PROFILE = '/user/profile';

interface EmailDuplicateResponse {
  code: number;
  description?: string;
}

interface UserProfileResponse {
  code: number;
  description: string;
  result: UserProfile;
}

export const loginAPI = async (email: string, password: string): Promise<number> => {
  try {
    const response = await requestWithoutAuth.post(LOGIN_PATH, { email, password });

    const { data, status } = response;

    window.localStorage.setItem('accessToken', data.result);

    return status;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { code } = error.response?.data;
      if (code === 500) {
        throw new Error('존재하지 않는 회원입니다. '); // TODO: 멘트 수정 필요 (로그인 실패)
      }
    }
    return await Promise.reject(error);
  }
};

interface SignupAPIParams {
  email: string;
  password: string;
  nickname: string;
}

export const signupAPI = async ({ email, password, nickname }: SignupAPIParams) => {
  const response = await requestWithoutAuth.post(SIGNUP_PATH, { email, nickname, password });

  return response.data as ApiResponse;
};

export const emailDuplicateAPI = async (email: string) => {
  try {
    const { data } = await requestWithoutAuth.get(EMAIL_DUPLICATE_PATH, { params: { email } });
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

export const getUserProfileAPI = async () => {
  try {
    const { data } = await requestWithAuth.get(USER_PROFILE);

    const { code, result } = data as UserProfileResponse;

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
