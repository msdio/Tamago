import { AxiosError } from 'axios';

import request from '@/apis';

const LOGIN_PATH = '/auth/login';
const SIGNUP_PATH = '/auth/join';
const EMAIL_DUPLICATE_PATH = '/auth/email';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await request.post(LOGIN_PATH, { email, password });

    const { data, status } = response;
    const { accessToken, refreshToke } = data;

    return { accessToken, refreshToke };
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

export const signupAPI = async (email: string, nickname: string, password: string) => {
  const response = await request.post(SIGNUP_PATH, {});
};

export const emailDuplicateAPI = async (email: string) => {
  return await request.get(EMAIL_DUPLICATE_PATH, { params: { email } });
};
