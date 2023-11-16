import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type OrderDiscountStateProps = {
  popupVisible: boolean;
  selectedDiscount?: {
    id: string;
    value: string;
    name: string;
    type: string;
    valueDisplay: string;
  };
  deleteDiscountPopup?: {
    id: string;
    name: string;
  };
};

export const initialOrderDiscountState: OrderDiscountStateProps = {
  deleteDiscountPopup: undefined,
  popupVisible: false,
  selectedDiscount: undefined,
};

const slice = createSlice({
  initialState: initialOrderDiscountState,
  name: 'orderDiscount',
  reducers: {
    resetOrderDiscount: () => initialOrderDiscountState,
    setDeleteDiscountPopup: (
      state,
      action: PayloadAction<
        OrderDiscountStateProps['deleteDiscountPopup'] | undefined
      >,
    ) => {
      state.deleteDiscountPopup = action.payload;
    },
    setOrderDiscountPopup: (state, action: PayloadAction<boolean>) => {
      state.popupVisible = action.payload;
    },
    setSelectedDiscount: (
      state,
      action: PayloadAction<OrderDiscountStateProps['selectedDiscount']>,
    ) => {
      state.selectedDiscount = action.payload;
    },
  },
});

export const {
  resetOrderDiscount,
  setDeleteDiscountPopup,
  setOrderDiscountPopup,
  setSelectedDiscount,
} = slice.actions;

export default slice.reducer;
