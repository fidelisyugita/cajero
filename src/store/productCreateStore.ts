import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type Category = {
  name: string;
  id?: string;
};

type ProductCreateStateProps = {
  popupVisible: boolean;
  category?: Category;
  deleteCategory?: Category;
  assignCategoryPopupVisible: boolean;
  image?: {
    type: 'color' | 'image';
    value: string;
  };
};

export const initialProductCreateState: ProductCreateStateProps = {
  assignCategoryPopupVisible: false,
  category: undefined,
  deleteCategory: undefined,
  image: undefined,
  popupVisible: false,
};

const slice = createSlice({
  initialState: initialProductCreateState,
  name: 'productCreate',
  reducers: {
    resetProductCreate: () => initialProductCreateState,
    setAssignCategoryPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.assignCategoryPopupVisible = action.payload;
    },
    setDeleteProductCategory: (
      state,
      action: PayloadAction<Category | undefined>,
    ) => {
      state.deleteCategory = action.payload;
    },
    setProductCategory: (
      state,
      action: PayloadAction<Category | undefined>,
    ) => {
      state.category = action.payload;
    },
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

export const {
  resetProductCreate,
  setAssignCategoryPopupVisible,
  setDeleteProductCategory,
  setProductCategory,
  setProductCreatePopup,
  setProductImage,
} = slice.actions;

export default slice.reducer;
