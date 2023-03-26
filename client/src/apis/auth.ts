import { requestWithoutAuth } from '@/apis';
import type { ApiResponse } from '@/types/apiResponse';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';

export const loginAPI = async (email: string, password: string): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.post(LOGIN_PATH, { email, password });

  window.localStorage.setItem('accessToken', data.result);

  return data;
};

interface SignupAPIParams {
  email: string;
  password: string;
  nickname: string;
}

export const signupAPI = async ({ email, password, nickname }: SignupAPIParams): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.post(SIGNUP_PATH, { email, nickname, password });

  return data;
};

export const emailDuplicateAPI = async (email: string): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.get(EMAIL_DUPLICATE_PATH, { params: { email } });

  return data;
};
