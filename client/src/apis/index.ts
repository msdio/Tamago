import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  // withCredentials: true,
});

export default request;
