import { Header, SideNav, FollowBar, Card, BottomNav } from "components";
import { useSelector } from "react-redux";
export const Explore = () => {
  const { allPosts } = useSelector((store) => store.allPosts);
  return (
    <>
      <Header />
      <div className="container">
        <SideNav />
        <main className="main_container">
          <h1>Find your vibe</h1>
          {allPosts?.map((post) => (
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
