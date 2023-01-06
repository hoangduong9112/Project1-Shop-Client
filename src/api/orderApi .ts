import { OrderInformation } from 'types/order';
import { APIResponse } from 'types/response';
import axiosAdmin from './axiosAdmin';
import axiosClient from './axiosClient';

const orderApi = {
  getOrderList(): Promise<APIResponse<OrderInformation[]>> {
    const url = '/order';
    return axiosAdmin.get(url);
  },

  createOrder(data: Partial<OrderInformation>): Promise<OrderInformation> {
    const url = '/order';
    return axiosClient.post(url, data);
  },
};

export default orderApi;
