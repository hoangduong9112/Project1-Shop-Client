import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';
import { AuthResponse, ErrorResponse } from 'types/response';
import { fork, take, call, put, takeLatest } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* postLoginInfo(payload: LoginPayload) {
  const { data, status } = yield call(authApi.login, payload);
  return { data, status };
}

function* handleLogin(payload: LoginPayload) {
  let authResponse: AuthResponse = { data: { accessToken: '' }, status: 0 };
  let authError: ErrorResponse = { errorMessage: '', status: 0 };
  const { data, status } = yield call(postLoginInfo, payload);
  if (status === 200 || status === 201) {
    authResponse = {
      data,
      status,
    };
    yield sessionStorage.setItem('accessToken', authResponse.data.accessToken);
    yield put(authActions.loginSuccess());
    yield put(push('/admin'));
  } else {
    authError = {
      errorMessage: data,
      status,
    };
    yield put(authActions.loginFailed(authError));
  }
}

function* handleLogout() {
  yield sessionStorage.removeItem('accessToken');
  yield put(push('/home'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(sessionStorage.getItem('accessToken'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* redirectLoginPage() {
  yield put(push('/login'));
}

function* loginFailed() {
  yield put(authActions.logout());
  yield put(push('/login'));
}

export default function* authSaga() {
  yield takeLatest(authActions.redirectLoginPage.type, redirectLoginPage);
  yield takeLatest(authActions.loginFailed.type, loginFailed);

  yield fork(watchLoginFlow);
}
