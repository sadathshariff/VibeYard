import styles from "./SideNav.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { FiUser, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "firebase.js";
import { openToast } from "redux/features/toastSlice";
import { useDispatch } from "react-redux";

export const SideNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("userToken");
    navigate("/");
    dispatch(openToast({ message: "Logout successful", type: "success" }));
  };
  const getActiveStyle = ({ isActive }) =>
    isActive
      ? {
          backgroundColor: "var(--primary-color)",
          
        }
      : {};
  return (
    <div className={`${styles.sidenav_container} `}>
      <ul className="list">
        <li>
          <NavLink to="/feed" style={getActiveStyle}>
            <div className={`${styles.sidenav_item}`}>
              <BiHomeSmile size={27} />
              <p className={`${styles.nav_item}`}>Home</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" style={getActiveStyle}>
            <div className={`${styles.sidenav_item}`}>
              <MdTravelExplore size={27} />
              <p className={`${styles.nav_item}`}>Explore</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmark" style={getActiveStyle}>
            <div className={`${styles.sidenav_item}`}>
              <BsBookmark size={23} />
              <p className={`${styles.nav_item}`}>Saved</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" style={getActiveStyle}>
            <div className={`${styles.sidenav_item}`}>
              <FiUser size={25} />
              <p className={`${styles.nav_item}`}>Profile</p>
            </div>
          </NavLink>
        </li>
        <li>
          <div className={`${styles.sidenav_item}`}>
            <div className={`${styles.sidenav_item}`} onClick={() => logout()}>
              <FiLogOut size={25} />
              <p className={`${styles.nav_item}`}>Logout</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
