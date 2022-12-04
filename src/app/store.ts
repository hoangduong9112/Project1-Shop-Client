import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { authReducer } from 'features/auth/authSlice';
import { adminReducer } from 'features/admin/adminSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';
import { cartReducer } from 'features/home/cartSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  admin: adminReducer,
  cart: cartReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
