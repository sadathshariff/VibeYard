import { useState } from "react";
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
import { db } from "firebase.js";
import { getLoggedInUserData } from "firebaseMethods";

export const ProfileModal = ({ open, handleCloseModal }) => {
  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const initialData = {
    website: "",
    bio: "",
  };

  const [userInfo, setUserInfo] = useState(initialData);
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
    const { bio, website } = userInfo;
    if (bio && website) {
      await updateDoc(updatedUser, {
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
              <Avatar alt="User Profile" sx={{ width: 66, height: 66 }} />
            </Box>

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
