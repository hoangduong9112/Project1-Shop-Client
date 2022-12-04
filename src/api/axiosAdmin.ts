import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SecureStorageEnum } from 'enums/secureStorageEnum';

const accessToken =
  sessionStorage.getItem(SecureStorageEnum.ACCESS_TOKEN) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImR1b25nIiwiaWF0IjoxNjQyMDcwMjAyLCJleHAiOjE2NDIwNzM4MDJ9.z3yQexWvlN7rULV5Nt4eE44iUA7vE-y3CY6Tf38jqGk';
const axiosAdmin = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Add a request interceptor
axiosAdmin.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosAdmin.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosAdmin;