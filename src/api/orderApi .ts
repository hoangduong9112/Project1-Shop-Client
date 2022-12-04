import { OrderInformation } from 'types/order';
import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const orderApi = {
  getOrderList(): Promise<OrderInformation[]> {
    const url = '/order';
    return axiosAdmin.get(url);
  },

  createOrder(data: Partial<OrderInformation>): Promise<OrderInformation> {
    const url = '/order';
    return axiosClient.post(url, data);
  },
};

export default orderApi;
