import axios from 'axios';
import { User } from '../types';

export type UserResponse = {
  user: User
}

export const login = (baseUrl: string) => (email: string, password: string): Promise<UserResponse> => {
  return axios.post(`${baseUrl}/api/users/login`, {
    user: {
      email,
      password
    }
  })
    .then(response => response.data);
};