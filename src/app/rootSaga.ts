import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/authSaga';
import adminSaga from 'features/admin/adminSaga';
import cartSaga from 'features/home/cartSaga';

export default function* rootSaga() {
  yield all([authSaga(), adminSaga(), cartSaga()]);
}
