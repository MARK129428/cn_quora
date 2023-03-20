import axios, { CreateAxiosDefaults } from 'axios';
import { message } from 'antd';

const BaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/v1' : '';

const baseConfig: CreateAxiosDefaults = {
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const instance = axios.create(baseConfig);

instance.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    instance.defaults.headers.common.Authorization = localStorage.getItem('token');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response: any) => {
  if (!response.showMessage) {
    return response.data;
  }
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
