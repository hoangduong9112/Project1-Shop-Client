import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductParams } from 'types/product';
import { toast } from 'react-toastify';

export interface AdminState {
  isCreating: boolean;
  isUpdating: boolean;
  isFetchProductList: boolean;
  productList: Product[];
}

const initialState: AdminState = {
  isCreating: false,
  isUpdating: false,
  isFetchProductList: false,
  productList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchProductList(state) {
      state.isFetchProductList = true;
    },
    fetchProductListSuccess(state) {
      state.isFetchProductList = false;
    },
    fetchProductListFailed(state) {
      state.isFetchProductList = false;
    },
    setProductList(state, action: PayloadAction<Product[]>) {
      state.productList = action.payload;
    },

    createNewProduct(state, action: PayloadAction<ProductParams>) {
      state.isCreating = true;
    },
    createNewProductSuccess(state) {
      state.isCreating = false;
      toast.success('Successfully');
    },
    createNewProductFailed(state) {
      state.isCreating = false;
      toast.error('Failure');
    },

    updateProduct(state, action: PayloadAction<Partial<Product>>) {
      state.isUpdating = true;
    },
    updateProductSuccess(state) {
      state.isUpdating = false;
      toast.success('Successfully');
    },
    updateProductFailed(state) {
      state.isUpdating = false;
      toast.error('Failure');
    },

    deleteProduct(state, action: PayloadAction<string | undefined>) {},
    deleteProductSuccess(state) {
      toast.success('Successfully');
    },
    deleteProductFailed(state) {
      toast.error('Failure');
    },

    redirectDeleteProduct(state, action: PayloadAction<string | undefined>) {},
    redirectUpdateProduct(state, action: PayloadAction<string>) {},
    redirectAdmin(state) {},
    redirectHome(state) {},
  },
});

export const adminActions = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
