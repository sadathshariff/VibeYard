import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "firebaseMethods";

const initialState = {
  isLoading: false,
  allPosts: [],
};

const allPostSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default allPostSlice.reducer;
