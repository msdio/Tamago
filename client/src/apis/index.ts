import axios from 'axios';

const createRequestWithoutAuth = () => {
  const _request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return _request;
};

const createAuthenticationApi = () => {
  const _requestWithAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  _requestWithAuth.interceptors.request.use(
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

  return _requestWithAuth;
};

export const requestWithAuth = createAuthenticationApi();
export const requestWithoutAuth = createRequestWithoutAuth();
