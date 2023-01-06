import { APIResponse } from './../types/response';
import axiosClient from './axiosClient';
import { Product, ProductParams } from 'types/product';
import axiosAdmin from './axiosAdmin';

const productApi = {
  getProductList(): Promise<APIResponse<Product[]>> {
    const url = '/product';
    return axiosClient.get(url);
  },
  getProductById(product_id: string): Promise<Product> {
    const url = `/product/${product_id}`;
    return axiosClient.get(url);
  },
  createProduct(data: ProductParams): Promise<Product> {
    const url = '/product';
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('image', data.image);
    return axiosAdmin.post(url, formData);
  },
  updateProduct(data: Product): Promise<Product> {
    const url = `/product`;
    const formData = new FormData();
    formData.append('product_id', data.product_id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('image', data.image);

    return axiosAdmin.put(url, formData);
  },
  deleteProduct(product_id: string): Promise<any> {
    const url = `/product/delete`;
    const data = { product_id: product_id };
    console.log('data', data);
    return axiosAdmin.post(url, data);
  },
};

export default productApi;
