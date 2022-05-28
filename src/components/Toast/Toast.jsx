import { Snackbar } from "@mui/material";

import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "redux/features/toastSlice";
export const Toast = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector((store) => store.toast);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
