import type { AxiosError } from 'axios';

import { axiosInstance } from '.';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  code: string;
}

export const postSignup = async ({ name, email, password }: SignupData) => {
  try {
    const response: SignupResponse = await axiosInstance.post('/auth/join', {
      name,
      email,
      password,
    });
    return response.code;
  } catch (error) {
    if ((error as AxiosError).response?.status === 500) {
      return 'SERVER_ERROR';
    }
    return 'ERROR';
  }
};
