import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {MenuChooseStateProps} from './menuChooseStore';

export type MenuOrderStateProps = {
  orderList: MenuChooseStateProps[] | [];
};

export const initialMenuOrderState: MenuOrderStateProps = {
  orderList: [],
};

const slice = createSlice({
  initialState: initialMenuOrderState,
  name: 'menuOrder',
  reducers: {
    addProductToOrderList: (
      state,
      action: PayloadAction<MenuChooseStateProps>,
    ) => {
      state.orderList.push(action.payload);
    },
  },
});

export const {addProductToOrderList} = slice.actions;

export default slice.reducer;
