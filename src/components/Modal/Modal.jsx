import styles from "./Modal.module.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FiPlusCircle } from "react-icons/fi";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <h3 onClick={handleOpen} className={`${styles.modal_heading}`}>
          <FiPlusCircle /> What's vibing?
        </h3>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>What's on your Mind Today?</h3>
            <div className={`${styles.modal_div}`}>
              <textarea
                className={`${styles.modal_text}`}
                tabIndex="0"
                placeholder="Start Writing...."
              />
            </div>
            <div className={`${styles.modal_btn_div}`}>
              <Button variant="outlined" color="success">
                Post
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
