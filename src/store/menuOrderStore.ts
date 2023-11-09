import equal from 'deep-equal';

import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ProductOrderProps} from '../interfaces/CommonInterface';

export type MenuOrderStateProps = {
  orderList: ProductOrderProps[] | [];
  removeAllOrderListPopup: boolean;
};

export const initialMenuOrderState: MenuOrderStateProps = {
  orderList: [],
  removeAllOrderListPopup: false,
};

const slice = createSlice({
  initialState: initialMenuOrderState,
  name: 'menuOrder',
  reducers: {
    addProductToOrderList: (
      state,
      action: PayloadAction<ProductOrderProps>,
    ) => {
      const {orderList} = state;
      const existingProductIndex = orderList.findIndex(ol => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {productOrderId, qty, ...compareA} = ol;

        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          productOrderId: productOrderIdB,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          qty: qtyB,
          ...compareB
        } = action.payload;
        return ol.id === action.payload.id && equal(compareA, compareB);
      });

      if (existingProductIndex > -1) {
        orderList[existingProductIndex].qty =
          orderList[existingProductIndex].qty + action.payload.qty;
      } else {
        orderList.push(action.payload);
      }
    },
    removeAllProductFromOrderList: state => {
      state.orderList = [];
    },
    removeProductFromOrderList: (state, action: PayloadAction<string>) => {
      state.orderList = state.orderList.filter(
        todo => todo.productOrderId !== action.payload,
      );
    },
    setRemoveAllOrderListPopup: (state, action: PayloadAction<boolean>) => {
      state.removeAllOrderListPopup = action.payload;
    },
  },
});

export const {
  addProductToOrderList,
  removeAllProductFromOrderList,
  removeProductFromOrderList,
  setRemoveAllOrderListPopup,
} = slice.actions;

export default slice.reducer;
