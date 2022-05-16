import { Header, SideNav, FollowBar, Card, BottomNav } from "components";
export const Bookmark = () => {
  return (
    <>
      <Header />
      <div className="container">
        <SideNav />
        <main className="main_container">
          <h1>All your BookMarked Posts</h1>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <div className="bottomNav_container">
            <BottomNav />
          </div>
        </main>
        <FollowBar />
      </div>
    </>
  );
};
