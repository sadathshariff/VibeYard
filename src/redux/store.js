import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "redux/features/toastSlice";
import userReducer from "redux/features/user/userSlice";
import allPostsReducer from "redux/features/allPosts/allPostslice";
import modalReducer from "redux/features/modal/modalSlice";
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    allPosts: allPostsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
