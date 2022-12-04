import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from 'types/response';
import { toast } from 'react-toastify';

export interface AuthState {
  isLoggedIn: boolean;
  error: ErrorResponse;
}
export interface LoginPayload {
  userName: string;
  password: string;
}
const initialState: AuthState = {
  isLoggedIn: false,
  error: { errorMessage: '', status: 0 },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    redirectLoginPage(state) {},
    login(state, action: PayloadAction<LoginPayload>) {},
    loginSuccess(state) {
      state.isLoggedIn = true;
      toast.success('Successfully');
    },
    loginFailed(state, action: PayloadAction<ErrorResponse>) {
      console.log(action.payload);
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },

    resetLoggedInStatus(state) {
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
