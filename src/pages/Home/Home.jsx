import styles from "./Home.module.css";

import Typography from "@mui/material/Typography";
import {
  Header,
  SideNav,
  FollowBar,
  ModalComp,
  Card,
  BottomNav,
} from "components";
import { useSelector, useDispatch } from "react-redux";


export const Home = () => {
  const { allPosts } = useSelector((store) => store.allPosts);
  const { user } = useSelector((store) => store.user);
 

  const filterPosts = allPosts?.filter((p) =>
    user?.following?.some((person) => person.userId === p?.data?.userId)
  );

  // const filterByDate = [...filterPosts].sort(
  //   (a, b) =>
  //     new Date(a.data?.timeStamp.seconds * 1000) -
  //     new Date(b.data?.timeStamp.seconds * 1000)
  // );

  // const isUndefined = (o) => typeof o.popularity === "undefined";
  // const filterByLikes = filterPosts?.sort(
  //   (a, b) => b?.data?.likes?.length - a?.data?.likes?.length
  // );

  return (
    <>
      <Header />
      <div className="container">
        <SideNav />

        <main className="main_container">
          <ModalComp />

          {filterPosts.length > 0 ? (
            <>
              {filterPosts?.map((post) => (
                <Card posts={post} key={post.id} />
              ))}
            </>
          ) : (
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "Quicksand" }}
            >
              Start Following People and Vibe with them
            </Typography>
          )}

          <div className="bottomNav_container">
            <BottomNav />
          </div>
        </main>
        <FollowBar />
      </div>
    </>
  );
};
