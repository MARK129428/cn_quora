import axios, { CreateAxiosDefaults } from 'axios';
import { message } from 'antd';

const BaseUrl = process.env.NODE_ENV === 'development' ? '/api' : '';

const baseConfig: CreateAxiosDefaults = {
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const instance = axios.create(baseConfig);

instance.interceptors.request.use((config) => {
  instance.defaults.headers.common.Authorization = localStorage.getItem('token');
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  if (response.data.message === 'error') {
    message.error(response.data.data);
  } else if (response.data.message === 'success') {
    message.success(response.data.message);
  }
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
