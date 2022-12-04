import axiosClient from './axiosClient';
import { LoginPayload } from 'features/auth/authSlice';

const authApi = {
  login(data: LoginPayload): Promise<any> {
    const url = '/login';
    return axiosClient.post(url, data);
  },
};

export default authApi;
