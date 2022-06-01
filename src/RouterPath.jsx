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
export const RouterPath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userName" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
