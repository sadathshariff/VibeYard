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

export const Home = () => {
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
              <Chip label="Trending" color="primary" variant="outlined" />
              <Chip label="Latest" color="success" variant="outlined" />
              <Chip label="Oldest" color="success" variant="outlined" />
            </Stack>
          </div>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <div className="bottomNav_container">
            <BottomNav />
          </div>
        </main>
        <FollowBar />
      </div>
    </>
  );
};
