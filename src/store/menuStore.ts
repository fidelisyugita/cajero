import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialMenuStateProps = {
  selectedCategoryId: string;
  addProductPopupProps?: {
    item: {
      id: string;
      qty: number;
      variant?: {
        [key: string]: string[] | string;
      };
      discount?: {
        type: 'percent' | 'amount';
        value: number;
      };
    };
  };
};

export const initialMenuState: InitialMenuStateProps = {
  addProductPopupProps: undefined,
  selectedCategoryId: 'all',
};

const slice = createSlice({
  initialState: initialMenuState,
  name: 'menu',
  reducers: {
    addQty: state => {
      const statePopup = state.addProductPopupProps;
      if (statePopup) {
        statePopup.item.qty = statePopup.item.qty + 1;
      }
    },
    setAddProductPopupProps: (
      state,
      action: PayloadAction<InitialMenuStateProps['addProductPopupProps']>,
    ) => {
      state.addProductPopupProps = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    setSingleVariant: (
      state,
      action: PayloadAction<{[key: string]: string}>,
    ) => {
      const stateItem = state.addProductPopupProps?.item;
      if (stateItem) {
        state.addProductPopupProps = {
          item: {
            ...stateItem,
            variant: {
              ...stateItem.variant,
              ...action.payload,
            },
          },
        };
      }
    },
    subtractQty: state => {
      const statePopup = state.addProductPopupProps;
      if (statePopup) {
        statePopup.item.qty = statePopup.item.qty - 1;
      }
    },
  },
});

export const {
  addQty,
  setAddProductPopupProps,
  setSelectedCategoryId,
  setSingleVariant,
  subtractQty,
} = slice.actions;

export default slice.reducer;
