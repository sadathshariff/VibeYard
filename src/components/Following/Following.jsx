import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { unFollowUser, followUser } from "firebaseMethods";
import { Link } from "react-router-dom";
export const Following = ({ open, handleClose, isOtherUser }) => {
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
          <h3>Following</h3>
          <ul className="list">
            {!isOtherUser ? (
              <>
                {user?.following?.length > 0 ? (
                  <>
                    {user?.following?.map((peer) => (
                      <Box
                        key={peer.userId}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt={peer.userName} />
                        <Link to={`/user/${peer.userName}`}>
                          <p>{peer.userName}</p>
                        </Link>
                        <Button
                          variant="outlined"
                          color="success"
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
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    <p>You are not following anyone !</p>
                    <p>Start Vibing </p>
                  </>
                )}
              </>
            ) : (
              <>
                {otherUser?.data?.following?.length > 0 ? (
                  <>
                    {otherUser?.data?.following?.map((peer) => (
                      <Box
                        key={peer.userId}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt={peer.userName} />
                        <Link to={`/user/${peer.userName}`}>
                          <p onClick={handleClose}>{peer.userName}</p>
                        </Link>
                        {peer.userId === token ? (
                          <Button variant="outlined">Follows You</Button>
                        ) : (
                          <>
                            {user?.following?.some(
                              (u) => u.userId === peer.userId
                            ) ? (
                              <Button
                                variant="outlined"
                                color="success"
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
                    <p>not following anyone !</p>
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
