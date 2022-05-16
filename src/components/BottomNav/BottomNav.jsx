import styles from "./BottomNav.module.css";
import { BiHomeSmile } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export const BottomNav = () => {
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
            <FiLogOut size={25} />
          </Link>
        </li>
      </ul>
    </>
  );
};
