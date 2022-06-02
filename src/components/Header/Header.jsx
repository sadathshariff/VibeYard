import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { openToast } from "redux/features/toastSlice";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
export const Header = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allusers } = useSelector((store) => store.allUsers);
  const { token } = useSelector((store) => store.user);
  const debounce = (cb, delay = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const debounceText = debounce((text) => setUser(text));
  const filteredUsers = allusers.filter((item) => {
    return Object.values(item.data.userName)
      .join("")
      .toLowerCase()
      .includes(user.toLowerCase());
  });

  const handleChange = (e) => {
    debounceText(e.target.value);
  };

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
          defaultValue={user}
          onChange={(e) => handleChange(e)}
        />
        {user && filteredUsers?.length !== 0 && (
          <Box
            sx={{
              width: "max-content",
              height: "max-content",
              position: "absolute",
              my: 1,
              zIndex: 2,
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              p: 1,
              backgroundColor: "white",
              color: "var(--text-color)",
            }}
          >
            {filteredUsers?.map((peer) => (
              <Box
                key={peer.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Avatar alt={peer?.data?.userName} />
                {peer?.id === token ? (
                  <Link to={`/profile`}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="p"
                      sx={{ fontWeight: 500, px: 1, fontFamily: "Nunito" }}
                    >
                      {peer?.data?.userName}
                    </Typography>
                  </Link>
                ) : (
                  <Link to={`/user/${peer?.data?.userName}`}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="p"
                      sx={{ fontWeight: 500, px: 1, fontFamily: "Nunito" }}
                    >
                      {peer?.data?.userName}
                    </Typography>
                  </Link>
                )}
              </Box>
            ))}
          </Box>
        )}
      </div>

      <div className={`${styles.user_avatar}`}>
        <Avatar alt="User Profile" sx={{ cursor: "pointer" }} />
      </div>
    </header>
  );
};
