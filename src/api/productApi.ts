import axiosClient from './axiosClient';
import { Product } from 'types/product';
import axiosAdmin from './axiosAdmin';

const productApi = {
  getProductList(): Promise<Product[]> {
    const url = '/product';
    return axiosClient.get(url);
  },
  getProductById(_id: string): Promise<Product> {
    const url = `/product/${_id}`;
    return axiosClient.get(url);
  },
  createProduct(data: Product): Promise<Product> {
    const url = '/product';
    return axiosAdmin.post(url, data);
  },
  updateProduct(data: Product): Promise<Product> {
    const url = `/product/${data._id}`;
    return axiosAdmin.put(url, data);
  },
  deleteProduct(_id: string): Promise<any> {
    const url = `/product/${_id}`;
    return axiosAdmin.delete(url);
  },
};

export default productApi;
