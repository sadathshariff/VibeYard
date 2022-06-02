import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const RequireAuth = () => {
  const { token } = useSelector((store) => store.user);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
