import { useSelector } from "react-redux";
import { Navigate, useParams, Outlet } from "react-router-dom";
export const ProfileAuth = () => {
  const { userName } = useParams();
  const { allusers } = useSelector((store) => store.allUsers);
  const { token } = useSelector((store) => store.user);
  const userId = allusers.find((p) => p?.data?.userName === userName)?.id;
  return token !== userId ? <Outlet /> : <Navigate to="/profile" />;
};
