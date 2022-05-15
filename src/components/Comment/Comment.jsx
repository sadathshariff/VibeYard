import styles from "./Comment.module.css";
import Avatar from "@mui/material/Avatar";
export const Comment = () => {
  return (
    <>
      <div className={`${styles.comment_container}`}>
        <div className={`${styles.comment_user}`}>
          <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
        </div>
        <div className={`${styles.comment_div}`}>
          <p className={`${styles.profile_name}`}>Sadathulla Shariff</p>
          <p className={`${styles.comment_text}`}>Comment of the User</p>
        </div>
      </div>
    </>
  );
};
