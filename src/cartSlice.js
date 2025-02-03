import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const updatedCart = [...state.cart, action.payload];
      state.cart = updatedCart;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
