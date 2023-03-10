import { cartActions } from './cartSlice';

import { put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';
import orderApi from 'api/orderApi ';
import { OrderInformation } from 'types/order';
import { APIResponse } from 'types/response';

function* openCart() {
  yield put(push('/cart'));
}

function* fetchOrderList() {
  const result: APIResponse<OrderInformation[]> = yield call(orderApi.getOrderList);

  result.data.forEach((order) => {
    order.products.forEach((product) => {
      return {
        ...product,
        price: product.price,
      };
    });
  });
  yield put(cartActions.setOrderList(result.data));
}

function* order(action: PayloadAction<Partial<OrderInformation>>) {
  try {
    yield call(orderApi.createOrder, action.payload);
    yield put(cartActions.orderNewProductSuccess());
  } catch {
    yield put(cartActions.orderNewProductFailed());
  }
}

function* redirectHome() {
  yield put(push('/'));
}

export default function* cartSaga() {
  yield takeLatest(cartActions.openCart.type, openCart);
  yield takeLatest(cartActions.order.type, order);
  yield takeLatest(cartActions.orderNewProductFailed.type, redirectHome);
  yield takeLatest(cartActions.redirectHome.type, redirectHome);
  yield takeLatest(cartActions.fetchOrderList.type, fetchOrderList);
}
