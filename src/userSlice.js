import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userInputValue: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => (state.username = action.payload),
    addUserInputValue: (state, action) => {
      console.log("gagaagag")
      state.userInputValue = action.payload
    }
  },
});

export const { addUser, addUserInputValue } = userSlice.actions;
export default userSlice.reducer;
