import productApi from 'api/productApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'types/product';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { adminActions } from './adminSlice';

function* fetchProductList() {
  const { data } = yield call(productApi.getProductList);
  const productList: Product[] = data.data.map((product: Product) => {
    return {
      ...product,
      price: +product.price,
    };
  });
  yield put(adminActions.setProductList(productList));
}

function* fetchDashboardData() {
  try {
    yield all([call(fetchProductList)]);
    yield put(adminActions.fetchProductListSuccess());
  } catch {
    yield put(adminActions.fetchProductListFailed());
  }
}

function* createNewProduct(action: PayloadAction<Product>) {
  try {
    yield call(productApi.createProduct, action.payload);
    yield put(adminActions.createNewProductSuccess());
  } catch {
    yield put(adminActions.createNewProductFailed());
  }
}

function* redirectDeleteProduct(action: PayloadAction<string>) {
  yield put(push(`/admin/deleteProduct/${action.payload}`));
}

function* deleteProduct(action: PayloadAction<string>) {
  try {
    yield call(productApi.deleteProduct, action.payload);
    yield put(adminActions.deleteProductSuccess());
  } catch {
    yield put(adminActions.deleteProductFailed());
  }
}

function* redirectUpdateProduct(action: PayloadAction<Product>) {
  yield put(push(`/admin/updateProduct/${action.payload}`));
}

function* updateProduct(action: PayloadAction<Product>) {
  try {
    yield call(productApi.updateProduct, action.payload);
    yield put(adminActions.updateProductSuccess());
  } catch {
    yield put(adminActions.updateProductFailed());
  }
}

function* redirectAdmin() {
  yield put(push('/admin'));
}

function* redirectHome() {
  yield put(push('/'));
}

export default function* adminSaga() {
  yield takeLatest(adminActions.fetchProductList.type, fetchDashboardData);

  yield takeLatest(adminActions.createNewProduct.type, createNewProduct);
  yield takeLatest(adminActions.createNewProductSuccess.type, redirectAdmin);

  yield takeLatest(adminActions.redirectDeleteProduct.type, redirectDeleteProduct);
  yield takeLatest(adminActions.deleteProduct.type, deleteProduct);
  yield takeLatest(adminActions.deleteProductSuccess.type, redirectAdmin);

  yield takeLatest(adminActions.redirectUpdateProduct.type, redirectUpdateProduct);
  yield takeLatest(adminActions.updateProduct.type, updateProduct);
  yield takeLatest(adminActions.updateProductSuccess.type, redirectAdmin);

  yield takeLatest(adminActions.redirectAdmin.type, redirectAdmin);

  yield takeLatest(adminActions.redirectHome.type, redirectHome);
}
