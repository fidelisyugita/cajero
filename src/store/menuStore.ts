import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialMenuStateProps = {
  selectedCategoryId: string;
};

export const initialMenuState: InitialMenuStateProps = {
  selectedCategoryId: 'all',
};

const slice = createSlice({
  initialState: initialMenuState,
  name: 'menu',
  reducers: {
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const {setSelectedCategoryId} = slice.actions;

export default slice.reducer;
