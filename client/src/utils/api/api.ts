import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

import { ApiError } from './error';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  // withCredentials: true,
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const apiError = new ApiError();

    if (error.response) {
      apiError.make(error.response.data);
    } else {
      apiError.setDescription(error.message);
    }

    return Promise.reject(apiError);
  },
);

export default request;
