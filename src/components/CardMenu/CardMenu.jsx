import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdMoreVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletePost } from "firebaseMethods";
import { openModal } from "redux/features/modal/modalSlice";
import { setPostDetails } from "redux/features/allPosts/allPostslice";

export const CardMenu = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    dispatch(setPostDetails(data));
    dispatch(openModal());
    handleClose();
  };
  const handleDelete = () => {
    deletePost(data.id, dispatch);
    handleClose();
  };

  return (
    <div>
      <MdMoreVert size={25} onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
