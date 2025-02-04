import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

// zasto u addToCart ne mogu radit --state.cart = state.cart.push(action.payload)-- a decrease amount mogu

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const updatedCart = [...state.cart, action.payload];
      state.cart = updatedCart;
      // state.cart = state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (pizza) => pizza.id !== action.payload
      );
      state.cart = updatedCart;
    },
    increaseAmount: (state, action) => {
      state.cart.map((pizza) => {
        if (pizza.id === action.payload) pizza.amount += 1;
        return;
      });
    },
    decreaseAmount: (state, action) => {
      state.cart.map((pizza) => {
        if (pizza.id === action.payload && pizza.amount > 1) {
          pizza.amount -= 1;
          return;
        }
        if (pizza.id === action.payload && pizza.amount <= 1)
          state.cart = state.cart.filter(
            (pizza) => pizza.id !== action.payload
          );
      });
    },
  },
});

export const { addToCart, increaseAmount, decreaseAmount, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
