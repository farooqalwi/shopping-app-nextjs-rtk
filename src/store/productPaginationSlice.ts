import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductPaginationState {
  skip: number;
}

const initialState: ProductPaginationState = {
  skip: 0,
};

const productPaginationSlice = createSlice({
  name: 'productPagination',
  initialState,
  reducers: {
    setProductSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    incrementProductSkip: (state, action: PayloadAction<number>) => {
      state.skip += action.payload;
    },
  },
});

export const {
  setProductSkip,
  incrementProductSkip,
} = productPaginationSlice.actions;

export default productPaginationSlice.reducer;
