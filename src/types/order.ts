export interface OrderedItem {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Package {
  product_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface PackageParam {
  product_id: string;
  quantity: number;
}

export interface OrderInformationParams {
  user_name: string;
  address: string;
  phone: string;
  packages: PackageParam[];
}

export interface OrderInformation {
  order_id: string;
  created_at: string;
  user_name: string;
  address: string;
  phone: string;
  products: Package[];
}

export interface CustomerInformation {
  user_name: string;
  address: string;
  phone: string;
}
