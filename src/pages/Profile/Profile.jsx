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
  ModalComp,
} from "components";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
export const Profile = () => {
  const { user, token } = useSelector((store) => store.user);
  const { allPosts } = useSelector((store) => store.allPosts);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [openFollowers, setOpenFollowers] = useState(false);
  const handleFollowersModal = () => setOpenFollowers((prev) => !prev);

  const [openFollowing, setOpenFollowing] = useState(false);
  const handleFollowingModal = () => setOpenFollowing((prev) => !prev);

  const userPosts = allPosts.filter(
    (post) => post?.data?.userName === user?.userName
  );

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
                  <Typography
                    variant="p"
                    href={user?.website}
                    component="a"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {user?.website}
                  </Typography>
                </p>
              ) : (
                <p align="center">Add your website url here</p>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ModalComp />
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
              <div onClick={() => handleFollowersModal()}>
                <h3 align="center">{user?.followers?.length}</h3>
                <h3>Followers</h3>
              </div>
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
              <div>
                <h3 align="center">{userPosts?.length}</h3>
                <h3>Posts</h3>
              </div>
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
              <div onClick={() => handleFollowingModal()}>
                <h3 align="center">{user?.following?.length}</h3>
                <h3>Following</h3>
              </div>
              <Following
                open={openFollowing}
                handleClose={handleFollowingModal}
              />
            </Box>
          </Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: "Quicksand" }}
          >
            Your Posts
          </Typography>
          <div>
            {userPosts.length > 0 ? (
              <>
                {userPosts.map((post) => (
                  <Card posts={post} key={post.id} />
                ))}
              </>
            ) : (
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Quicksand" }}
              >
                You haven't posted anything yet, start vibing with others
              </Typography>
            )}
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
