import styles from "./Comment.module.css";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
export const Comment = ({ comment }) => {
  return (
    <>
      <div className={`${styles.comment_container}`}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="User Profile" />
        </Box>
        <div className={`${styles.comment_div}`}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className={`${styles.profile_name}`}>{comment?.userName}</p>
            <p className={`${styles.comment_date}`}>{comment?.timeStamp}</p>
          </Box>
          <p className={`${styles.comment_text}`}>{comment?.comment}</p>
        </div>
      </div>
    </>
  );
};
