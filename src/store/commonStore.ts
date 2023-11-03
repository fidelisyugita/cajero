import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialCommonStateProps = {
  firstTimeOpenApp: boolean;
  globalLoadingVisible: boolean;
};

const initialCommonState: InitialCommonStateProps = {
  firstTimeOpenApp: true,
  globalLoadingVisible: false,
};

const slice = createSlice({
  initialState: initialCommonState,
  name: 'common',
  reducers: {
    setFirstTimeOpenApp: (state, action: PayloadAction<boolean>) => {
      state.firstTimeOpenApp = action.payload;
    },
    setGlobalLoadingVisible: (state, action: PayloadAction<boolean>) => {
      state.globalLoadingVisible = action.payload;
    },
  },
});

export const {setFirstTimeOpenApp, setGlobalLoadingVisible} = slice.actions;

export default slice.reducer;
