import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUserData } from "firebaseMethods";

const initialState = {
  user: {},
  isLoading: false,
  userId: null,
  token: localStorage.getItem("userToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: {
    [getLoggedInUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [getLoggedInUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getLoggedInUserData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
