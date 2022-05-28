import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  type: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeToast: (state) => {
      state.isOpen = false;
      state.message = "";
      state.type = "success";
    },
  },
});
export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
