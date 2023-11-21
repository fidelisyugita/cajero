import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ProductCreateStateProps = {
  popupVisible: boolean;
  image?: {
    type: 'color' | 'image';
    value: string;
  };
};

export const initialProductCreateState: ProductCreateStateProps = {
  image: undefined,
  popupVisible: false,
};

const slice = createSlice({
  initialState: initialProductCreateState,
  name: 'orderDiscount',
  reducers: {
    resetProductCreate: () => initialProductCreateState,
    setProductCreatePopup: (state, action: PayloadAction<boolean>) => {
      state.popupVisible = action.payload;
    },
    setProductImage: (
      state,
      action: PayloadAction<ProductCreateStateProps['image']>,
    ) => {
      state.image = action.payload;
    },
  },
});

export const {resetProductCreate, setProductCreatePopup, setProductImage} =
  slice.actions;

export default slice.reducer;
