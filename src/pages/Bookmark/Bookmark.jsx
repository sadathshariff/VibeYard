import { Header, SideNav, FollowBar, Card, BottomNav } from "components";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
export const Bookmark = () => {
  const { user } = useSelector((store) => store.user);
  const { allPosts } = useSelector((store) => store.allPosts);
  const bookmarkedPost = allPosts?.filter((post) =>
    user?.bookmarks?.find((data) => data?.postId === post?.id)
  );

  return (
    <>
      <Header />
      <div className="container">
        <SideNav />
        <main className="main_container">
          <h1>All your BookMarked Posts</h1>
          {bookmarkedPost.length > 0 ? (
            <>
              {bookmarkedPost?.map((post) => (
                <Card posts={post} key={post.id} />
              ))}
            </>
          ) : (
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Quicksand" }}
            >
              Nothing in the BookMarks yet
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
