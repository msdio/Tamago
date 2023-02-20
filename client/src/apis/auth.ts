import { AxiosError } from 'axios';

import request from '@/apis';

import { EmailDuplicateError, NicknameDuplicateError, ServerError } from './error';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';

interface SignupResponse {
  code: number;
  description?: string;
}

interface EmailDuplicateResponse {
  code: number;
  description?: string;
}

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = request.post(LOGIN_PATH, {});
  } catch (error) {}
};

export const signupAPI = async (email: string, nickname: string, password: string) => {
  try {
    await request.post(SIGNUP_PATH, { email, nickname, password });
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
    const { data } = await request.get(EMAIL_DUPLICATE_PATH, { params: { email } });
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
