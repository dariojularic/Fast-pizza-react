import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload.amount)
      const updatedCart = [...state.cart, action.payload ];
      state.cart = updatedCart;
    },
    increaseAmount: (state, action) => {
      state.cart.map(pizza => {
        if (pizza.id === action.payload) pizza.amount += 1
        return
      })
    },
    decreaseAmount: (state, action) => {
      state.cart.map(pizza => {
        if (pizza.id === action.payload && pizza.amount > 0) pizza.amount -= 1
        return
      })
    }
  },
});

export const { addToCart, increaseAmount, decreaseAmount } = cartSlice.actions;
export default cartSlice.reducer;
