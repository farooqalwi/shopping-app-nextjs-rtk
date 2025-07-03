import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as Product[],
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const exists = state.find(item => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
