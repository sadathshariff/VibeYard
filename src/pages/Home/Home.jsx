import Typography from "@mui/material/Typography";
import {
  Header,
  SideNav,
  FollowBar,
  ModalComp,
  Card,
  BottomNav,
} from "components";
import { useSelector } from "react-redux";

export const Home = () => {
  const { allPosts } = useSelector((store) => store.allPosts);
  const { user, userId, token } = useSelector((store) => store.user);

  const filterPosts = allPosts?.filter((p) =>
    user?.following?.some(
      (person) =>
        p.data.userName === user?.userName || person.userId === p?.data?.userId
    )
  );

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
