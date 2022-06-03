import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unFollowUser } from "firebaseMethods";
import { Link } from "react-router-dom";

export const Followers = ({ open, handleClose, isOtherUser }) => {
  const { user, otherUser, token } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: `var(--light-shadow)`,
    p: 1,
    borderRadius: "10px",
    fontFamily: "Nunito",
    color: "var(--text-color)",
    height: "max-content",
    width: 300,
    maxHeight: 300,
    overflowY: "auto",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Followers</h3>
          <ul className="list">
            {!isOtherUser ? (
              <>
                {user?.followers?.length > 0 ? (
                  <>
                    {user?.followers?.map((person) => (
                      <Box
                        key={person.userId}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt={person.userName} />
                        <Link to={`/user/${person.userName}`}>
                          <p>{person.userName}</p>
                        </Link>
                        {user?.following?.some(
                          (p) => p.userId === person.userId
                        ) ? (
                          <Button
                            variant="contained"
                            onClick={() =>
                              unFollowUser(
                                user,
                                token,
                                person.userId,
                                person,
                                dispatch
                              )
                            }
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() =>
                              followUser(
                                user,
                                token,
                                person.userId,
                                person,
                                dispatch
                              )
                            }
                          >
                            Follow
                          </Button>
                        )}
                      </Box>
                    ))}
                  </>
                ) : (
                  <p>You don't any followers yet,Start Vibing with others</p>
                )}
              </>
            ) : (
              <>
                {otherUser?.data?.followers?.length > 0 ? (
                  <>
                    {otherUser?.data?.followers?.map((peer) => (
                      <Box
                        key={peer.userId}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt={peer.userName} />
                        <Link to={`/user/${peer?.userName}`}>
                          <p onClick={handleClose}>{peer.userName}</p>
                        </Link>

                        {peer.userId === token ? (
                          <Button variant="outlined">Following </Button>
                        ) : (
                          <>
                            {user?.following?.some(
                              (u) => u.userId === peer.userId
                            ) ? (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  unFollowUser(
                                    user,
                                    token,
                                    peer.userId,
                                    peer,
                                    dispatch
                                  )
                                }
                              >
                                Unfollow
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  followUser(
                                    user,
                                    token,
                                    peer.userId,
                                    peer,
                                    dispatch
                                  )
                                }
                              >
                                Follow
                              </Button>
                            )}
                          </>
                        )}
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    <p>no followers yet!</p>
                  </>
                )}
              </>
            )}
          </ul>
        </Box>
      </Modal>
    </div>
  );
};
