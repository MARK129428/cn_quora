import axios, { CreateAxiosDefaults } from 'axios';
import { message } from 'antd';
import { useHistory } from 'react-router';

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
  if (response.data.message === 'error') {
    message.error(response.data.data);
  }
  return response.data;
}, (error) => {
  // if (error.response.data.code === 401) {
  //   window.location.href = `${window.location.origin}/#/signin`;
  // }
  return Promise.reject(error);
});

export default instance;
