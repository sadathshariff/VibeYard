import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "firebaseMethods";

const initialState = {
  isLoading: false,
  allPosts: [],
  editPost: {},
};

const allPostSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    setPostDetails: (state, action) => {
      state.editPost = action.payload;
    },
    clearPostDetails: (state) => {
      state.editPost = {};
    },
  },
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
export const { setPostDetails, clearPostDetails } = allPostSlice.actions;

export default allPostSlice.reducer;
