import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Header, SideNav, FollowBar, Card, BottomNav } from "components";
import { useSelector, useDispatch } from "react-redux";
import { sortByPosts } from "redux/features/allPosts/allPostslice";
export const Explore = () => {
  const dispatch = useDispatch();
  const { allPosts, sortBy } = useSelector((store) => store.allPosts);

  const filterPosts = (sortBy) => {
    switch (sortBy) {
      case "trending":
        return [...allPosts].sort(
          (a, b) => b?.data?.likes?.length - a?.data?.likes?.length
        );
      case "oldest":
        return [...allPosts].sort(
          (a, b) =>
            new Date(a.data?.timeStamp.seconds * 1000) -
            new Date(b.data?.timeStamp.seconds * 1000)
        );
      case "latest":
        return [...allPosts];
      default:
        return allPosts;
    }
  };

  const filteredPosts = filterPosts(sortBy);

  return (
    <>
      <Header />
      <div className="container">
        <SideNav />
        <main className="main_container">
          <h1>Find your vibe</h1>
          <div className=" flex align-center p-sm">
            <h3>Sort By:</h3>
            <Stack direction="row" spacing={1} margin={1}>
              <Chip
                label="Trending"
                color="primary"
                sx={{
                  color: "white",
                }}
                variant={sortBy === "trending" ? "contained" : "outlined"}
                onClick={() => dispatch(sortByPosts("trending"))}
              />
              <Chip
                label="Latest"
                color="primary"
                sx={{ color: "white" }}
                variant={sortBy === "latest" ? "contained" : "outlined"}
                onClick={() => dispatch(sortByPosts("latest"))}
              />
              <Chip
                color="primary"
                label="Oldest"
                sx={{ color: "white" }}
                variant={sortBy === "oldest" ? "contained" : "outlined"}
                onClick={() => dispatch(sortByPosts("oldest"))}
              />
            </Stack>
          </div>
          {filteredPosts?.map((post) => (
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
