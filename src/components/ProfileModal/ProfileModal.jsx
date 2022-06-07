import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { openToast } from "redux/features/toastSlice";
import { db, storage } from "firebase.js";
import { getLoggedInUserData } from "firebaseMethods";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const ProfileModal = ({ open, handleCloseModal }) => {
  const { token, user } = useSelector((store) => store.user);
  const initialData = {
    photoUrl: "",
    website: "",
    bio: "",
  };
  const [userInfo, setUserInfo] = useState(initialData);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = () => {
      // const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, user?.userName);
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
            setUserInfo((prev) => ({ ...prev, photoUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleReset = () => {
    setUserInfo(initialData);
    handleCloseModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = doc(db, "users", token);
    const { photoUrl, bio, website } = userInfo;

    if (photoUrl && bio && website) {
      await updateDoc(updatedUser, {
        photoUrl: photoUrl,
        bio: bio,
        website: website,
      });
      dispatch(getLoggedInUserData(token));
      dispatch(
        openToast({
          message: "Profile Updated successfully!",
          type: "success",
        })
      );
      setUserInfo(initialData);
    } else {
      dispatch(
        openToast({
          message: "Please Fill All the fields ",
          type: "warning",
        })
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Avatar
                alt="User Profile"
                src={userInfo.photoUrl}
                sx={{ width: 86, height: 86, my: 1 }}
              />
            </Box>
            <div className="flex-center">
              <input
                autoFocus
                id="image"
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website"
              type="url"
              fullWidth
              value={userInfo.website}
              name="website"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="bio"
              label="Bio"
              type="text"
              fullWidth
              value={userInfo.bio}
              name="bio"
              onChange={(e) => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleReset()}
              variant="outlined"
              color="error"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="success"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
