import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "firebaseMethods";

const initialState = {
  isLoading: false,
  allusers: [],
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allusers = action.payload;
    },
    [getAllUsers.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default allUsersSlice.reducer;
