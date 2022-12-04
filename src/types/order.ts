export interface OrderedItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CustomerInformation {
  name: string;
  address: string;
  phone: string;
}

export interface OrderInformation {
  customerInformation: CustomerInformation;
  productionInformation: OrderedItem[];
  createdAt: string;
  _id: string;
}
