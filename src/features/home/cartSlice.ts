import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import { toast } from 'react-toastify';
import { OrderedItem, OrderInformation, OrderInformationParams } from 'types/order';

export interface CartSate {
  isOrdering: boolean;
  totalQuantity: number;
  orderedItems: OrderedItem[];
  totalPrice: number;
  orderList: OrderInformation[];
}

const initialState: CartSate = {
  isOrdering: false,
  totalQuantity: 0,
  orderedItems: [],
  totalPrice: 0,
  orderList: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart(state) {},
    addToCart(state, action: PayloadAction<OrderedItem>) {
      if (action.payload.quantity > 0) {
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
        const existItemIndex = findIndex(state.orderedItems, {
          product_id: action.payload.product_id,
        });
        if (existItemIndex >= 0) {
          state.orderedItems[existItemIndex].quantity += action.payload.quantity;
        } else {
          state.orderedItems.push(action.payload);
        }
      }
      toast.success('Added', {
        position: 'top-center',
        autoClose: 1300,
      });
    },

    fetchOrderList(state) {},
    fetchOrderListSuccess(state) {},
    fetchOrderListFailed(state) {},
    setOrderList(state, action: PayloadAction<OrderInformation[]>) {
      state.orderList = action.payload;
    },

    order(state, action: PayloadAction<Partial<OrderInformationParams>>) {
      state.isOrdering = true;
    },
    orderNewProductSuccess(state) {
      state.totalQuantity = 0;
      state.orderedItems = [];
      state.totalPrice = 0;
      state.isOrdering = false;
      toast.success('Order Successfully');
    },
    orderNewProductFailed(state) {
      state.isOrdering = false;
      toast.error('Order Failed');
    },

    redirectHome(state) {},
    removeItem(state, action: PayloadAction<OrderedItem>) {
      remove(state.orderedItems, (item) => {
        return item.product_id === action.payload.product_id;
      });
      state.totalQuantity -= action.payload.quantity;
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
