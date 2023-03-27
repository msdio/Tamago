import { requestWithoutAuth } from '@/apis';
import type { ApiResponse } from '@/types/apiResponse';

const SIGNUP_PATH = '/auth/join';
const LOGIN_PATH = '/auth/login';
const EMAIL_DUPLICATE_PATH = '/auth/email';

interface AuthAPIParams {
  email: string;
  password: string;
  nickname?: string;
}

export const loginAPI = async ({ email, password }: AuthAPIParams): Promise<ApiResponse> => {
  const { data } = await requestWithoutAuth.post(LOGIN_PATH, { email, password });

  window.localStorage.setItem('accessToken', data.result);

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
