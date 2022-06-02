import styles from "./BottomNav.module.css";
import { BiHomeSmile } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "redux/features/user/userSlice";
import { openToast } from "redux/features/toastSlice";
import { useDispatch } from "react-redux";

export const BottomNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
    dispatch(openToast({ message: "Logout successful", type: "success" }));
  };
  return (
    <>
      <ul className={`${styles.bottomNav_container} list flex justify-sb`}>
        <li>
          <Link to="/feed">
            <BiHomeSmile size={27} />
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <MdTravelExplore size={27} />
          </Link>
        </li>
        <li>
          <Link to="/bookmark">
            <BsBookmark size={23} />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FiUser size={25} />
          </Link>
        </li>
        <li>
          <Link to="/">
            <FiLogOut size={25} onClick={() => logoutUser()} />
          </Link>
        </li>
      </ul>
    </>
  );
};
