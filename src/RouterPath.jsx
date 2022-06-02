import { Route, Routes } from "react-router-dom";
import {
  Login,
  Signup,
  Bookmark,
  Explore,
  Landing,
  Profile,
  NotFound,
  Home,
  User,
} from "pages";
import { ProfileAuth, RequireAuth } from "components";
export const RouterPath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/feed" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProfileAuth />}>
            <Route path="/user/:userName" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
