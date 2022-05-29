import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "redux/features/toastSlice";
import userReducer from "redux/features/user/userSlice";
import allPostsReducer from "redux/features/allPosts/allPostslice";
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    allPosts: allPostsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
