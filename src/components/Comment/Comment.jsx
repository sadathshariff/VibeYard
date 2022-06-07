import styles from "./Comment.module.css";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
export const Comment = ({ comment }) => {
  const { user } = useSelector((store) => store.user);
  const { allusers } = useSelector((store) => store.allUsers);
  const commentProfile = allusers?.find(
    (user) => user?.data?.userName === comment?.userName
  );
  return (
    <>
      <div className={`${styles.comment_container}`}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="User Profile" src={commentProfile?.data?.photoUrl} />
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
