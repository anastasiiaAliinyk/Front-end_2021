import axios, { AxiosInstance } from 'axios';
import { UserT } from '../types';

export const getUser = (authAxiosInstance: AxiosInstance) => (): Promise<UserT> =>
  authAxiosInstance.get(`/api/user`)
    .then(response => response.data.user);

export const login = (baseUrl: string) => (email: string, password: string): Promise<UserT> => {
  return axios.post(`${baseUrl}/api/users/login`, {
    user: {
      email,
      password
    }
  })
    .then(response => response.data.user);
};

export const signUp = (baseUrl: string) => (email: string, password: string, username: string): Promise<UserT> => {
  return axios.post(`${baseUrl}/api/users`, {
    user: {
      email,
      password,
      username
    }
  })
    .then(response => response.data.user);
};

export const updateUser = (authAxiosInstance: AxiosInstance) => (user: UserT): Promise<UserT> =>
  authAxiosInstance.put('/api/articles', { user })
    .then(response => response.data.user);

export const getUserProfile = (baseUrl: string) => (username: string) => {
  return axios.get(`${baseUrl}/api/profiles/${username}`)
    .then(response => response.data.profile);
};
