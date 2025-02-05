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
      state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (pizza) => pizza.id !== action.payload
      );
      state.cart = updatedCart;
    },
    clearCart: (state) => {
      state.cart = []
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

// export const totalPrice = createSelector()

// export const selectTotalAmount = createSelector([selectItems], (items) =>
//   items.reduce((amount, item) => amount + item.amount, 0)

// );


function totalPrice(array) {
  let totalPrice = 0;
  const uniqueIds = [];

  array.forEach((item) => {
    totalPrice += item.unitPrice * item.amount;
    if (uniqueIds.includes(item.id)) return;
    else uniqueIds.push(item.id);
  });
  // provjerit jel ok return ovaj objekt
  return {totalPrice, uniqueIds};
}

export const { addToCart, increaseAmount, decreaseAmount, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export { totalPrice };
