import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
export const Header = () => {
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
        <Avatar alt="User Profile" />
      </div>
    </header>
  );
};
