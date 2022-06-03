import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUserData } from "firebaseMethods";
import { signOut } from "firebase/auth";
import { auth } from "firebase.js";

const initialState = {
  user: {},
  isLoading: false,
  userId: null,
  token: localStorage.getItem("userToken") || null,
  otherUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.token = action.payload;
    },
    logout: (state) => {
      signOut(auth);
      localStorage.removeItem("userToken");
      state.user = {};
      state.otherUser = {};
    },
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
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
export const { setUserId, setOtherUser, logout } = userSlice.actions;

export default userSlice.reducer;
