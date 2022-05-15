import styles from "./SideNav.module.css";
import { Link } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { FiUser, FiLogOut } from "react-icons/fi";

export const SideNav = () => {
  return (
    <div className={`${styles.sidenav_container} `}>
      <ul className="list">
        <li>
          <Link to="/feed">
            <div className={`${styles.sidenav_item}`}>
              <BiHomeSmile size={27} />
              <p className={`${styles.nav_item}`}>Home</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <div className={`${styles.sidenav_item}`}>
              <MdTravelExplore size={27} />
              <p className={`${styles.nav_item}`}>Explore</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/bookmark">
            <div className={`${styles.sidenav_item}`}>
              <BsBookmark size={23} />
              <p className={`${styles.nav_item}`}>Saved</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <div className={`${styles.sidenav_item}`}>
              <FiUser size={25} />
              <p className={`${styles.nav_item}`}>Profile</p>
            </div>
          </Link>
        </li>
        <li>
          <div className={`${styles.sidenav_item}`}>
            <Link to="/">
              <div className={`${styles.sidenav_item}`}>
                <FiLogOut size={25} />
                <p className={`${styles.nav_item}`}>Logout</p>
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};
