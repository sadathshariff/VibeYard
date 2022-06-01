import styles from "./FollowBar.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllUsers } from "firebaseMethods";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const FollowBar = () => {
  const dispatch = useDispatch();
  const { allusers } = useSelector((store) => store.allUsers);
  const { user, token } = useSelector((store) => store.user);

  const findUserDoc = allusers.find((u) => u?.id === token);

  const filterUser = allusers.filter((u) => u?.id !== token);

  const people = filterUser.filter(
    (person) => !user?.following?.some((p) => p.userId === person.id)
  );

  const trimPeople = people.length > 4 ? people.splice(0, 4) : people;

  const handleFollow = (peer) => {
    followUser(user, findUserDoc.id, peer?.id, peer?.data, dispatch);
  };

  return (
    <>
      <div className={`${styles.followbar_container}`}>
        <h3>Suggestions</h3>
        <ul className="list">
          {trimPeople?.map((peer) => (
            <li key={peer.id} className={`${styles.user_info}`}>
              <Avatar alt={peer?.data?.userName} />
              <Link to={`/user/${peer?.data?.userName}`}>
                <p>{peer?.data?.userName}</p>
              </Link>
              <Button variant="contained" onClick={() => handleFollow(peer)}>
                Follow
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
