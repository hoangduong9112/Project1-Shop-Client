export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}

export interface ProductParams {
  name: string;
  description: string;
  price: number;
  image?: any;
}
