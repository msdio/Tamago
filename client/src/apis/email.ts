import type { AxiosError } from 'axios';

import { axiosInstance } from '.';

export const getEmailDuplication = async (email: string) => {
  try {
    const response = await axiosInstance.get('/auth/email', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 500) {
      return 'SERVER_ERROR';
    }
    return 'ERROR';
  }
};

export const getEmailCertification = async (email: string) => {
  try {
    const response = await axiosInstance.get('/auth/email/certification', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 500) {
      return 'SERVER_ERROR';
    }
    return 'ERROR';
  }
};
