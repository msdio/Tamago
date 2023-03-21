import { AxiosError } from 'axios';

import { requestWithoutAuth } from '@/apis';

import { EmailDuplicateError, NicknameDuplicateError, ServerError } from './error';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';

interface EmailDuplicateResponse {
  code: number;
  description?: string;
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
  try {
    await requestWithoutAuth.post(SIGNUP_PATH, { email, nickname, password });
  } catch (error) {
    if (error instanceof AxiosError) {
      const { code } = error.response?.data;
      if (code === 3001) {
        throw new EmailDuplicateError();
      }
      if (code === 3002) {
        throw new NicknameDuplicateError();
      }
    }
    return await Promise.reject(error);
  }
};

export const emailDuplicateAPI = async (email: string) => {
  try {
    const { data } = await requestWithoutAuth.get(EMAIL_DUPLICATE_PATH, { params: { email } });
    const { code } = data as EmailDuplicateResponse;
    if (code === 3001) {
      throw new EmailDuplicateError();
    }
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
