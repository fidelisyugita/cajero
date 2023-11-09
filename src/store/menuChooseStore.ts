import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ProductProps} from '../interfaces/CommonInterface';

type DiscountProps = {
  type?: 'percent' | 'amount';
  value?: string;
};

export type MenuChooseStateProps = {
  product?: ProductProps & {
    discount?: DiscountProps;
    qty: number;
    note?: string;
  };
};

export const initialMenuChooseState: MenuChooseStateProps = {
  product: undefined,
};

const slice = createSlice({
  initialState: initialMenuChooseState,
  name: 'menuChoose',
  reducers: {
    addQtyProduct: state => {
      const stateProduct = state.product;
      if (stateProduct) {
        stateProduct.qty = stateProduct.qty + 1;
      }
    },
    chooseProduct: (
      state,
      action: PayloadAction<MenuChooseStateProps['product']>,
    ) => {
      state.product = action.payload;
    },
    setProductDiscount: (
      state,
      action: PayloadAction<Partial<DiscountProps>>,
    ) => {
      if (state.product) {
        state.product.discount = {
          ...state.product?.discount,
          ...action.payload,
        };
      }
    },
    setProductNotes: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.note = action.payload;
      }
    },
    setProductVariantMultiple: (
      state,
      action: PayloadAction<{[key: string]: string}>,
    ) => {
      if (state.product) {
        const objectKey = Object.keys(action.payload)[0];
        const selectedValue = action.payload[objectKey];
        const existingSelected =
          state.product.variants[objectKey]?.selected || [];

        const updatedSelected = existingSelected.includes(selectedValue)
          ? existingSelected.filter(value => value !== selectedValue)
          : [...existingSelected, selectedValue];

        state.product.variants = {
          ...state.product.variants,
          [objectKey]: {
            ...state.product.variants[objectKey],
            selected: updatedSelected.sort(),
          },
        };
      }
    },
    setProductVariantSingle: (
      state,
      action: PayloadAction<{[key: string]: string}>,
    ) => {
      if (state.product) {
        const objectKey = Object.keys(action.payload)[0];
        state.product.variants = {
          ...state.product.variants,
          [objectKey]: {
            ...state.product.variants[objectKey],
            selected: [action.payload[objectKey]],
          },
        };
      }
    },
    subtractQtyProduct: state => {
      const stateProduct = state.product;
      if (stateProduct) {
        stateProduct.qty = stateProduct.qty - 1;
      }
    },
  },
});

export const {
  addQtyProduct,
  chooseProduct,
  setProductDiscount,
  setProductNotes,
  setProductVariantMultiple,
  setProductVariantSingle,
  subtractQtyProduct,
} = slice.actions;

export default slice.reducer;
