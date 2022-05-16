import styles from "./Profile.module.css";
import { useState } from "react";
import {
  Header,
  SideNav,
  FollowBar,
  Card,
  BottomNav,
  ProfileModal,
} from "components";
import { Box, Avatar, Button } from "@mui/material";
export const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  return (
    <>
      <Header />
      <div className="container">
        <SideNav />
        <main className="main_container">
          <div className={`${styles.profilePic} flex-column `}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
              }}
            >
              <Avatar alt="User Profile" sx={{ width: 86, height: 86 }} />
              <h2>Profile Name Of User</h2>
              <Box
                sx={{
                  component: "div",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleOpenModal}
                >
                  Edit Profile
                </Button>
                <ProfileModal open={open} handleCloseModal={handleCloseModal} />
              </Box>
              <p align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                modi ratione adipisci molestias non explicabo dicta qui beatae
                ipsa earum.
              </p>
              <p align="center">Website.com</p>
            </Box>
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                flexDirection: "column",
              }}
            >
              <h3>20</h3>
              <h3>Followers</h3>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                flexDirection: "column",
              }}
            >
              <h3>20</h3>
              <h3>Posts</h3>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                flexDirection: "column",
              }}
            >
              <h3>20</h3>
              <h3>Following</h3>
            </Box>
          </Box>
          <h2>Your Posts</h2>
          <div>
            <Card />
            <Card />
            <Card />
          </div>

          <div className="bottomNav_container">
            <BottomNav />
          </div>
        </main>
        <FollowBar />
      </div>
    </>
  );
};
