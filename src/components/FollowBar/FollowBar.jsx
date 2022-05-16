import styles from "./FollowBar.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
export const FollowBar = () => {
  const people = [
    {
      id: 1,
      name: "Sadath",
    },
    {
      id: 2,
      name: "Nisha",
    },
    {
      id: 3,
      name: "Aish",
    },
    {
      id: 4,
      name: "Jenny",
    },
    {
      id: 5,
      name: "Jyo",
    },
    {
      id: 6,
      name: "Chanchal",
    },
    {
      id: 7,
      name: "Mazz",
    },
    {
      id: 8,
      name: "Yash",
    },
  ];
  return (
    <>
      <div className={`${styles.followbar_container}`}>
        <h3>Suggestions</h3>
        <ul className="list">
          {people?.map(({ id, name }) => (
            <li key={id} className={`${styles.user_info}`}>
              <Avatar alt={name} />
              <p>{name}</p>
              <Button variant="contained" >
                Follow
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
