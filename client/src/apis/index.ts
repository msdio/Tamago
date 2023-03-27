import type { AxiosError } from 'axios';
import axios from 'axios';

const defaultErrorResponse = {
  data: {
    code: 500,
    description: '서버가 응답하지 않습니다.',
  },
};

const createApiWithoutAuth = () => {
  const _request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  _request.interceptors.response.use(
    (data) => {
      return data;
    },
    async (error: AxiosError) => {
      const { response } = error;
      const customResponse = response ?? defaultErrorResponse;

      return await Promise.reject(customResponse.data);
    },
  );

  return _request;
};

const createApiWithAuth = () => {
  const _requestWithAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  _requestWithAuth.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem('accessToken');

      if (accessToken === null) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      }

      config.headers['Content-Type'] = 'application/json';
      config.headers.Authorization = `Bearer ${access_token}`;

      return config;
    },
    async (error: AxiosError) => {
      const { response } = error;
      const customResponse = response ?? defaultErrorResponse;

      return await Promise.reject(customResponse.data);
    },
  );

  _requestWithAuth.interceptors.response.use(
    (data) => {
      return data;
    },
    async (error: AxiosError) => {
      const { response } = error;
      const customResponse = response ?? defaultErrorResponse;

      return await Promise.reject(customResponse.data);
    },
  );

  return _requestWithAuth;
};

export const requestWithAuth = createApiWithAuth();
export const requestWithoutAuth = createApiWithoutAuth();
