import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "redux/features/toastSlice";
import userReducer from "redux/features/user/userSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
