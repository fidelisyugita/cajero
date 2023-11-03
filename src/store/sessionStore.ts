import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type SessionStateProps = {
  isSignIn: boolean;
};

export const initialSessionState: SessionStateProps = {
  isSignIn: false,
};

const slice = createSlice({
  initialState: initialSessionState,
  name: 'session',
  reducers: {
    resetSessionState: state => ({
      ...initialSessionState,
    }),
    setIsSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
  },
});

export const {resetSessionState, setIsSignIn} = slice.actions;

export default slice.reducer;
