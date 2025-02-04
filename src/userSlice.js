import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
export { capitalizeName };
