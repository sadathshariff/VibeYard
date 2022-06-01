import styles from "./Modal.module.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FiPlusCircle } from "react-icons/fi";
import { db } from "firebase.js";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "firebaseMethods";
import { openModal, closeModal } from "redux/features/modal/modalSlice";
import { clearPostDetails } from "redux/features/allPosts/allPostslice";
// import { setIn } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: `var(--light-shadow)`,
  p: 3,
  borderRadius: "10px",
  fontFamily: "Nunito",
};

export const ModalComp = () => {
  const { user } = useSelector((store) => store.user);
  const { isOpen } = useSelector((store) => store.modal);
  const { editPost, allPosts } = useSelector((store) => store.allPosts);
  const isPostAlreadyPresent = allPosts.some((post) => post.id === editPost.id);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const handlePost = async () => {
    try {
      if (input !== "") {
        await addDoc(collection(db, "posts"), {
          userName: user?.userName,
          text: input,
          timeStamp: serverTimestamp(),
          userId: userId,
        });
      }
      setInput("");
      dispatch(getAllPosts());
      handleClose();
    } catch (error) {
      console.log("Error posting", error);
    }
  };
  const handleEdit = async () => {
    try {
      if (input !== "") {
        await updateDoc(doc(db, "posts", editPost.id), {
          userName: user?.userName,
          text: input,
          timeStamp: serverTimestamp(),
          userId: userId,
        });
      }
      setInput("");
      dispatch(getAllPosts());
      handleClose();
    } catch (error) {
      console.log("Error posting", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPostAlreadyPresent) {
      handleEdit();
    } else {
      handlePost();
    }
  };
  const handleOpen = () => {
    dispatch(openModal());
  };
  const handleClose = () => {
    dispatch(closeModal());
    dispatch(clearPostDetails());
  };
  return (
    <>
      <div>
        <h2 className={`${styles.modal_heading}`}>
          <FiPlusCircle onClick={handleOpen} /> What's vibing?
        </h2>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3 className="text-dark">What's on your Mind Today?</h3>
            <form onSubmit={handleSubmit}>
              <div className={`${styles.modal_div}`}>
                <textarea
                  className={`${styles.modal_text}`}
                  tabIndex="0"
                  placeholder="Start Writing...."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className={`${styles.modal_btn_div}`}>
                {isPostAlreadyPresent ? (
                  <Button variant="contained" color="success" type="submit">
                    Update
                  </Button>
                ) : (
                  <Button variant="contained" color="success" type="submit">
                    Post
                  </Button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};
