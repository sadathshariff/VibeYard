import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FiPlusCircle } from "react-icons/fi";
import { db, storage } from "firebase.js";
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
import { openToast } from "redux/features/toastSlice";
import IconButton from "@mui/material/IconButton";
import { FcOldTimeCamera } from "react-icons/fc";
import { MdEmojiEmotions } from "react-icons/md";
import { Input } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Picker from "emoji-picker-react";

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

export const ModalComp = ({ removeText }) => {
  const { user } = useSelector((store) => store.user);
  const { isOpen } = useSelector((store) => store.modal);
  const { editPost, allPosts, isEdit } = useSelector((store) => store.allPosts);
  const isPostAlreadyPresent = allPosts.some((post) => post.id === editPost.id);
  const [file, setFile] = useState("");
  const initialData = {
    input: "",
    image: "",
  };
  const [form, setForm] = useState(initialData);
  const userId = localStorage.getItem("userToken");
  const [showEmoji, setShowEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    setForm({
      ...form,
      input: form.input + (chosenEmoji ? chosenEmoji.emoji.toString() : ""),
    });
  }, [chosenEmoji]);

  const handlePost = async () => {
    try {
      if (form.input !== "") {
        await addDoc(collection(db, "posts"), {
          userName: user?.userName,
          text: form.input,
          timeStamp: serverTimestamp(),
          userId: userId,
          image: form.image,
        });
      }
      setForm(initialData);
      dispatch(getAllPosts());
      handleClose();
    } catch (error) {
      dispatch(
        openToast({
          message: `Some error occured, try again later`,
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `/posts/` + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              dispatch(
                openToast({ message: "you don't have access", type: "warning" })
              );
              break;
            case "storage/canceled":
              // User canceled the upload
              dispatch(
                openToast({ message: "you canceled the upload", type: "info" })
              );
              break;
            case "storage/unknown":
              dispatch(
                openToast({ message: "Something went wrong", type: "error" })
              );
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setForm((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handleEdit = async () => {
    try {
      if (form.input !== "") {
        await updateDoc(doc(db, "posts", editPost.id), {
          userName: user?.userName,
          text: form.input,
          timeStamp: serverTimestamp(),
          userId: userId,
          image: form.image,
        });
      }
      setForm(initialData);
      dispatch(getAllPosts());
      handleClose();
    } catch (error) {
      dispatch(
        openToast({
          message: `couldn't update post, try again later`,
          type: "error",
        })
      );
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
    setForm(initialData);
    setShowEmoji(false);
  };

  const editPostContent = () => {
    isEdit
      ? setForm({
          ...form,
          input: editPost?.data?.text,
          image: editPost?.data?.image,
        })
      : setForm(initialData);
  };
  useEffect(() => {
    editPostContent();
  }, [isEdit]);

  return (
    <>
      <div>
        {!removeText && (
          <h2 className={`${styles.modal_heading}`}>
            <FiPlusCircle onClick={handleOpen} /> What's vibing?
          </h2>
        )}
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
                  value={form.input}
                  onChange={(e) => setForm({ ...form, input: e.target.value })}
                />
                {form?.image && (
                  <Box sx={{ width: "30%", margin: "1rem auto" }}>
                    <img src={form?.image} alt="post" />
                  </Box>
                )}
              </div>
              <div className={`${styles.modal_btn_div}`}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      sx={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <FcOldTimeCamera size={30} />
                    </IconButton>
                  </label>
                  <MdEmojiEmotions
                    size={30}
                    color="black"
                    cursor="pointer"
                    onClick={() => setShowEmoji(!showEmoji)}
                  />
                  {showEmoji && (
                    <Box
                      sx={{ position: "absolute", left: "1rem", top: "3rem" }}
                    >
                      <Picker
                        onEmojiClick={onEmojiClick}
                        disableSearchBar={true}
                        pickerStyle={{ height: "10rem", width: "15rem" }}
                      />
                    </Box>
                  )}
                </Box>
                {isPostAlreadyPresent ? (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      fullwidth="true"
                    >
                      Update
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      fullwidth="true"
                    >
                      Post
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};
