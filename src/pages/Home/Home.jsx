import styles from "./Home.module.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {
  Header,
  SideNav,
  FollowBar,
  ModalComp,
  Card,
  BottomNav,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "firebaseMethods";
import { useEffect } from "react";

export const Home = () => {
  const { allPosts } = useSelector((store) => store.allPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <SideNav />

        <main className="main_container">
          <ModalComp />
          <div className=" flex align-center p-sm">
            <h3>Sort By:</h3>
            <Stack direction="row" spacing={1} margin={1}>
              <Chip label="Trending" color="primary" variant="contained" />
              <Chip label="Latest" color="success" variant="contained" />
              <Chip label="Oldest" color="success" variant="contained" />
            </Stack>
          </div>
          {allPosts?.map((post) => (
            <Card posts={post} key={post.id} />
          ))}

          <div className="bottomNav_container">
            <BottomNav />
          </div>
        </main>
        <FollowBar />
      </div>
    </>
  );
};
