import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

export const Followers = ({ open, handleClose }) => {
  const followers = [
    {
      id: 1,
      userName: "ElonMusk",
    },
    {
      id: 2,
      userName: "JohnCena",
    },
    {
      id: 3,
      userName: "KunalShah",
    },
  ];
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
    color: "var(--text-color)",
    height: "max-content",
    width: 300,
    maxHeight: 300,
    overflowY: "scroll",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Followers</h3>
          <ul className="list">
            {followers?.map(({ id, userName }) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Avatar alt={userName} />
                <p>{userName}</p>
                <Button variant="contained">Follow</Button>
              </Box>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  );
};
