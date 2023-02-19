import request from '@/apis';

const LOGIN_PATH = '/auth/login';
const SIGNUP_PATH = '/auth/join';
const EMAIL_DUPLICATE_PATH = '/auth/email';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = request.post(LOGIN_PATH, {});
  } catch (error) {}
};

export const signupAPI = async (email: string, nickname: string, password: string) => {
  const response = await request.post(SIGNUP_PATH, {});
};

export const emailDuplicateAPI = async (email: string) => {
  return await request.get(EMAIL_DUPLICATE_PATH, { params: { email } });
};
