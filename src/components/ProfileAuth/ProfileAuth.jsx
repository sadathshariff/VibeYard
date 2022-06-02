import { useSelector } from "react-redux";
import { Navigate, useParams, Outlet } from "react-router-dom";
export const ProfileAuth = () => {
  const { userName } = useParams();
  const { user } = useSelector((store) => store.user);
  return userName !== user?.userName ? <Outlet /> : <Navigate to="/profile" />;
};
