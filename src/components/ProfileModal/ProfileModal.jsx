import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box } from "@mui/material";

export const ProfileModal = ({ open, handleCloseModal }) => {
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Avatar alt="User Profile" sx={{ width: 66, height: 66 }} />
            </Box>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="bio"
              label="Bio"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
