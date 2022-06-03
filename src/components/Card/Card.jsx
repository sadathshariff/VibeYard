import styles from "./Card.module.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { CardMenu, Comment } from "components";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, getLoggedInUserData } from "firebaseMethods";
import { openToast } from "redux/features/toastSlice";
export const Card = ({ posts }) => {
  const { id } = posts;
  const { userName, text, timeStamp, comments, likes, userId } = posts.data;

  const time = new Date(timeStamp.seconds * 1000).toLocaleDateString();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { user } = useSelector((store) => store.user);

  const token = localStorage.getItem("userToken");
  const isLiked = likes?.some((post) => post.userId === token);
  const isBookmarked = user?.bookmarks?.some((n) => n.postId === id);

  const isUserSame = token === userId;
  const dispatch = useDispatch();

  const handleComment = async () => {
    try {
      const addComment = doc(db, "posts", id);
      await updateDoc(addComment, {
        comments: arrayUnion({
          userName: user?.userName,
          comment: commentText,
          timeStamp: new Date().toLocaleDateString(),
        }),
      });
      dispatch(getAllPosts());
    } catch (error) {
      console.log("Error Adding Coment", error);
    }
    setCommentText("");
  };

  const handleLike = async () => {
    try {
      const likePost = doc(db, "posts", id);
      await updateDoc(likePost, {
        likes: arrayUnion({
          userId: token,
          userName: user?.userName,
        }),
      });
      dispatch(getAllPosts());
    } catch (error) {
      console.log("Error Liking Post", error);
    }
  };
  const removeLike = async () => {
    try {
      const likePost = doc(db, "posts", id);
      await updateDoc(likePost, {
        likes: arrayRemove({
          userId: token,
          userName: user?.userName,
        }),
      });
      dispatch(getAllPosts());
    } catch (error) {
      console.log("Error Liking Post", error);
    }
  };

  const handleBookmark = async () => {
    try {
      const bookmarkPost = doc(db, "users", token);
      await updateDoc(bookmarkPost, {
        bookmarks: arrayUnion({
          postId: id,
        }),
      });
      dispatch(getLoggedInUserData(token));
      dispatch(
        openToast({
          message: "Bookmarked Post Successfully",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        openToast({
          message: "Couldn't Bookmark, try again later",
          type: "error",
        })
      );
    }
  };
  const removeFromBookmark = async () => {
    try {
      const bookmarkPost = doc(db, "users", token);
      await updateDoc(bookmarkPost, {
        bookmarks: arrayRemove({
          postId: id,
        }),
      });
      dispatch(getLoggedInUserData(token));
      dispatch(
        openToast({
          message: "Removed from Bookmarks",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        openToast({
          message: "Couldn't remove it, try again later",
          type: "error",
        })
      );
    }
  };

  const style = {
    width: "fit-content",
  };

  return (
    <>
      <div className={`${styles.card_container}`}>
        <div className={`${styles.card_header}`}>
          <Avatar alt="User Profile" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 1,
              cursor: "pointer",
            }}
          >
            <Link to={`/user/${userName}`}>
              <Typography
                variant="h6"
                display="block"
                gutterBottom
                component="div"
                sx={{
                  fontFamily: "Nunito",
                  marginBottom: 0,
                }}
              >
                {userName}
              </Typography>
            </Link>

            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontFamily: "Quicksand" }}
            >
              {time}
            </Typography>
          </Box>

          {isUserSame && (
            <Box sx={{ cursor: "pointer", marginLeft: "auto" }}>
              <CardMenu data={posts} />
            </Box>
          )}
        </div>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontFamily: "Nunito", my: 1.5 }}
        >
          {text}
        </Typography>

        <div className="flex card_icons_div">
          <div className={`${styles.card_icons}`}>
            {isLiked ? (
              <p onClick={() => removeLike()} className="flex-center">
                <FaHeart fill="red" />
                <span>{likes?.length}Like</span>
              </p>
            ) : (
              <>
                <p onClick={() => handleLike()} className="flex-center">
                  <AiOutlineHeart />
                  <span>
                    {likes?.length > 0 ? likes?.length : ""}
                    Like
                  </span>
                </p>
              </>
            )}
          </div>

          <div
            className={`${styles.card_icons}`}
            onClick={() => setShowComments((prev) => !prev)}
          >
            <GoComment />
            <p>Comments</p>
          </div>
          <div className={`${styles.card_icons}`}>
            {isBookmarked ? (
              <p onClick={() => removeFromBookmark()} className="flex-center">
                <FaBookmark />
                Bookmark
              </p>
            ) : (
              <p onClick={() => handleBookmark()} className="flex-center">
                <BsBookmark />
                Bookmark
              </p>
            )}
          </div>
        </div>

        {showComments && (
          <>
            <div className="flex justify-sb">
              <input
                type="text"
                name="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your Comment !"
                className={`${styles.card_comment_input}`}
              />
              <Button
                variant="contained"
                color="success"
                sx={style}
                onClick={() => handleComment()}
              >
                Send
              </Button>
            </div>
            {comments?.length > 0 && (
              <>
                <div className={`${styles.comment_container}`}>
                  {comments?.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
