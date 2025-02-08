import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (pizza) => pizza.id !== action.payload
      );
      state.cart = updatedCart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increaseAmount: (state, action) => {
      state.cart.map((pizza) => {
        if (pizza.id === action.payload) pizza.quantity += 1;
        return;
      });
    },
    decreaseAmount: (state, action) => {
      state.cart.map((pizza) => {
        if (pizza.id === action.payload && pizza.quantity > 1) {
          pizza.quantity -= 1;
          return;
        }
        if (pizza.id === action.payload && pizza.quantity <= 1)
          state.cart = state.cart.filter(
            (pizza) => pizza.id !== action.payload
          );
      });
    },
  },
});

export const getCart = (state) => state.cart.cart;
export const totalPrice = createSelector([getCart], (pizzas) =>
  pizzas.reduce((price, item) => price + item.unitPrice * item.quantity, 0)
);

export const numOfDiffPizzas = createSelector(
  [getCart],
  (pizzas) => pizzas.length
);

export default cartSlice.reducer;
export const {
  addToCart,
  increaseAmount,
  decreaseAmount,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
