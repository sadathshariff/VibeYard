import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
export const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.heading}`}>
        <h1>VibeYard</h1>
      </div>
      <div className={`${styles.input_search_div}`}>
        <input
          type="search"
          className={`${styles.input_text}`}
          placeholder="Search user!"
        />
      </div>
      <div className={`${styles.user_avatar}`}>
        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
      </div>
    </header>
  );
};
