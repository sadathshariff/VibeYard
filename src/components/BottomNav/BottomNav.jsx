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
            {/* <div className={`${styles.sidenav_item}`}></div> */}
            <BiHomeSmile size={27} />
          </Link>
        </li>
        <li>
          <Link to="/explore">
            {/* <div className={`${styles.sidenav_item}`}>
              
              <p className={`${styles.nav_item}`}>Explore</p>
            </div> */}
            <MdTravelExplore size={27} />
          </Link>
        </li>
        <li>
          <Link to="/bookmark">
            {/* <div className={`${styles.sidenav_item}`}>
              <p className={`${styles.nav_item}`}>Saved</p>
            </div> */}
            <BsBookmark size={23} />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            {/* <div className={`${styles.sidenav_item}`}>
             
              <p className={`${styles.nav_item}`}>Profile</p>
            </div> */}
            <FiUser size={25} />
          </Link>
        </li>
        <li>
          {/* <div className={`${styles.sidenav_item}`}> */}
          <Link to="/">
            {/* <div className={`${styles.sidenav_item}`}>
               
                <p className={`${styles.nav_item}`}>Logout</p>
              </div> */}
            <FiLogOut size={25} />
          </Link>
          {/* </div> */}
        </li>
      </ul>
    </>
  );
};
