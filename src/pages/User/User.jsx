import styles from "../Profile/Profile.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  SideNav,
  FollowBar,
  Card,
  BottomNav,
  Followers,
  Following,
} from "components";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUser } from "redux/features/user/userSlice";
import { followUser, unFollowUser } from "firebaseMethods";
export const User = () => {
  const userName = useParams();
  const dispatch = useDispatch();
  const { otherUser, token, user } = useSelector((store) => store.user);
  const { allPosts } = useSelector((store) => store.allPosts);
  const { allusers } = useSelector((store) => store.allUsers);

  const otherPerson = allusers?.find(
    (n) => n?.data?.userName === userName.userName
  );

  dispatch(setOtherUser(otherPerson));

  const [openFollowers, setOpenFollowers] = useState(false);
  const handleFollowersModal = () => setOpenFollowers((prev) => !prev);

  const [openFollowing, setOpenFollowing] = useState(false);
  const handleFollowingModal = () => setOpenFollowing((prev) => !prev);

  const otherUserPosts = allPosts.filter(
    (post) => post?.data?.userId === otherPerson?.id
  );

  const isFollowing = user?.following?.some(
    (user) => user.userId === otherUser.id
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
              <h2>{otherUser?.data?.userName}</h2>
              <Box as="div">
                {isFollowing ? (
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() =>
                      unFollowUser(
                        user,
                        token,
                        otherUser.id,
                        otherUser?.data,
                        dispatch
                      )
                    }
                  >
                    unfollow
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() =>
                      followUser(
                        user,
                        token,
                        otherUser.id,
                        otherUser?.data,
                        dispatch
                      )
                    }
                  >
                    follow
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  component: "div",
                }}
              >
                {otherUser?.data?.bio !== "" ? (
                  <p align="center">{otherUser?.data?.bio}</p>
                ) : (
                  <p align="center">
                    Add User Bio here so that people can vibe with you
                  </p>
                )}
                {otherUser?.data?.website !== "" ? (
                  <p align="center" sx={{ cursor: "pointer" }}>
                    <Typography
                      variant="p"
                      href={otherUser?.website}
                      component="a"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {otherUser?.data?.website}
                    </Typography>
                  </p>
                ) : (
                  <p align="center">Add your website url here</p>
                )}
              </Box>
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
              <h3>{otherUser?.data?.followers?.length}</h3>
              <h3 onClick={handleFollowersModal}>Followers</h3>
              <Followers
                open={openFollowers}
                handleClose={handleFollowersModal}
                isOtherUser={true}
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
              <h3>{otherUserPosts?.length}</h3>
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
              <h3>{otherUser?.data?.following?.length}</h3>
              <h3 onClick={handleFollowingModal}>Following</h3>
              <Following
                open={openFollowing}
                handleClose={handleFollowingModal}
                isOtherUser={true}
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
            {otherUserPosts.length > 0 ? (
              <>
                {otherUserPosts.map((post) => (
                  <Card posts={post} key={post.id} />
                ))}
              </>
            ) : (
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Quicksand" }}
              >
                {userName.userName} hasn't Posted anything yet!
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
