import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialRefundStateProps = {
  selectedRefundItems: number[];
  popupVisible: boolean;
};

export const initialRefundState: InitialRefundStateProps = {
  popupVisible: false,
  selectedRefundItems: [],
};

const slice = createSlice({
  initialState: initialRefundState,
  name: 'refund',
  reducers: {
    resetSelectRefundItems: state => {
      state.selectedRefundItems = [];
    },
    selectAllRefundItems: (state, action: PayloadAction<number[] | []>) => {
      state.selectedRefundItems = action.payload;
    },
    selectRefundItem: (state, action: PayloadAction<number>) => {
      const index = state.selectedRefundItems.findIndex(
        item => item === action.payload,
      );

      if (index !== -1) {
        state.selectedRefundItems.splice(index, 1);
      } else {
        state.selectedRefundItems.push(action.payload);
      }
    },
    setRefundPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.popupVisible = action.payload;
    },
  },
});

export const {selectAllRefundItems, selectRefundItem, setRefundPopupVisible} =
  slice.actions;

export default slice.reducer;
