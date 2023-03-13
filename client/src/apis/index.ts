import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const authenticationRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

authenticationRequest.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem('accessToken');

    if (access_token === null) {
      alert('로그인이 필요합니다. ');
      window.location.href = '/login';
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  },
);

export default request;
