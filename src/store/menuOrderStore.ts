import equal from 'deep-equal';

import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {DiscountProps, ProductOrderProps} from '../interfaces/CommonInterface';

export type MenuOrderStateProps = {
  orderList: ProductOrderProps[] | [];
  removeAllOrderListPopup: boolean;
  customerName: string;
  tableNumber: string;
  paymentMethod: string;
  paymentSuccessPopup: boolean;
  discount: DiscountProps | undefined;
};

export const initialMenuOrderState: MenuOrderStateProps = {
  customerName: '',
  discount: undefined,
  orderList: [],
  paymentMethod: '',
  paymentSuccessPopup: false,
  removeAllOrderListPopup: false,
  tableNumber: '',
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
        const {productOrderId, qty, totalPrice, ...compareA} = ol;

        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          productOrderId: productOrderIdB,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          qty: qtyB,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          totalPrice: totalPriceB,
          ...compareB
        } = action.payload;
        return ol.id === action.payload.id && equal(compareA, compareB);
      });

      if (existingProductIndex > -1) {
        orderList[existingProductIndex].qty =
          orderList[existingProductIndex].qty + action.payload.qty;
        orderList[existingProductIndex].totalPrice =
          orderList[existingProductIndex].totalPrice +
          action.payload.totalPrice;
      } else {
        orderList.push(action.payload);
      }
    },
    editProductInOrderList: (
      state,
      action: PayloadAction<ProductOrderProps>,
    ) => {
      const index = state.orderList.findIndex(
        ol => ol.productOrderId === action.payload.productOrderId,
      );

      if (index > -1) {
        state.orderList[index] = action.payload;
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
    resetOrderState: () => initialMenuOrderState,
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.customerName = action.payload;
    },
    setOrderDiscount: (
      state,
      action: PayloadAction<DiscountProps | undefined>,
    ) => {
      state.discount = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setPaymentSuccessPopup: (state, action: PayloadAction<boolean>) => {
      state.paymentSuccessPopup = action.payload;
    },
    setRemoveAllOrderListPopup: (state, action: PayloadAction<boolean>) => {
      state.removeAllOrderListPopup = action.payload;
    },
    setTableNumber: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
  },
});

export const {
  addProductToOrderList,
  editProductInOrderList,
  removeAllProductFromOrderList,
  removeProductFromOrderList,
  resetOrderState,
  setCustomerName,
  setOrderDiscount,
  setPaymentMethod,
  setPaymentSuccessPopup,
  setRemoveAllOrderListPopup,
  setTableNumber,
} = slice.actions;

export default slice.reducer;
