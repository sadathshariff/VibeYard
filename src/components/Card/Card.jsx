import styles from "./Card.module.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { Button } from "@mui/material";

import { Comment } from "components";
export const Card = () => {
  const [showComments, setShowComments] = useState(false);
  const style = {
    width: "fit-content",
  };
  return (
    <>
      <div className={`${styles.card_container}`}>
        <div className={`${styles.card_header}`}>
          <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
          <p className={`${styles.card_username}`}>NameOf User</p>
        </div>
        <div className={`${styles.card_content}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            enim amet aperiam maxime earum asperiores. Asperiores commodi
            aperiam molestiae fuga.
          </p>

          <div className="flex">
            <div className={`${styles.card_icons}`}>
              <AiOutlineHeart />
              <p>Like</p>
            </div>

            <div
              className={`${styles.card_icons}`}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <GoComment />
              <p>Comments</p>
            </div>
            <div className={`${styles.card_icons}`}>
              <BsBookmark />
              <p>Bookmark</p>
            </div>
          </div>
        </div>

        {showComments && (
          <>
            <div className="flex justify-sb">
              <input
                type="text"
                name="comment"
                placeholder="Write your Comment !"
                className={`${styles.card_comment_input}`}
              />
              <Button variant="contained" color="success" sx={style}>
                Send
              </Button>
            </div>
            <div className={`${styles.comment_container}`}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </>
        )}
      </div>
    </>
  );
};
