import styles from "./Modal.module.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FiPlusCircle } from "react-icons/fi";
import { db } from "firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "firebaseMethods";

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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((store) => store.user);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePost();
  };
  return (
    <>
      <div>
        <h2 className={`${styles.modal_heading}`}>
          <FiPlusCircle onClick={handleOpen} /> What's vibing?
        </h2>
        <Modal
          open={open}
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
                <Button variant="outlined" color="success" type="submit">
                  Post
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};
