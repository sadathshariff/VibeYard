import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "firebase.js";
import { useDispatch } from "react-redux";
import { openToast } from "redux/features/toastSlice";
export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("userToken");
    navigate("/");
    dispatch(openToast({ message: "Logout successful", type: "success" }));
  };
  const open = Boolean(anchorEl);
  // const id = open ? "logout" : undefined;
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.heading}`}>
        <Link to="/feed">
          <h1>VibeYard</h1>
        </Link>
      </div>
      <div className={`${styles.input_search_div}`}>
        <input
          type="search"
          className={`${styles.input_text}`}
          placeholder="Search user!"
        />
      </div>
      <div className={`${styles.user_avatar}`}>
        <Avatar
          alt="User Profile"
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        />
        <Popover
          // id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            fullwidth="true"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Popover>
      </div>
    </header>
  );
};
