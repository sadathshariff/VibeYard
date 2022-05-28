import styles from "./Profile.module.css";
import { useState } from "react";
import {
  Header,
  SideNav,
  FollowBar,
  Card,
  BottomNav,
  ProfileModal,
  Followers,
  Following,
} from "components";
import { Box, Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
export const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [openFollowers, setOpenFollowers] = useState(false);
  const handleFollowersModal = () => setOpenFollowers((prev) => !prev);

  const [openFollowing, setOpenFollowing] = useState(false);
  const handleFollowingModal = () => setOpenFollowing((prev) => !prev);
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
              <h2>{user?.userName}</h2>
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
              {user.bio !== "" ? (
                <p align="center">{user?.bio}</p>
              ) : (
                <p align="center">
                  Add User Bio here so that people can vibe with you
                </p>
              )}
              {user.website !== "" ? (
                <p align="center" sx={{ cursor: "pointer" }}>
                  <a
                    href={`//${user?.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user?.website}
                  </a>
                </p>
              ) : (
                <p align="center">Add your website url here</p>
              )}
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
                cursor: "pointer",
              }}
            >
              <h3>20</h3>
              <h3 onClick={handleFollowersModal}>Followers</h3>
              <Followers
                open={openFollowers}
                handleClose={handleFollowersModal}
              />
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
                cursor: "pointer",
              }}
            >
              <h3>20</h3>
              <h3 onClick={handleFollowingModal}>Following</h3>
              <Following
                open={openFollowing}
                handleClose={handleFollowingModal}
              />
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
