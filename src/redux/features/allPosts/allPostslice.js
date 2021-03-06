import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "firebaseMethods";

const initialState = {
  isLoading: false,
  allPosts: [],
  editPost: {},
  isEdit: false,
  sortBy: "latest",
};

const allPostSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    setPostDetails: (state, action) => {
      state.editPost = action.payload;
      state.isEdit = true;
    },
    clearPostDetails: (state) => {
      state.editPost = {};
      state.isEdit = false;
    },
    sortByPosts: (state, action) => {
      state.sortBy = action.payload;
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
export const { setPostDetails, clearPostDetails, sortByPosts } =
  allPostSlice.actions;

export default allPostSlice.reducer;
