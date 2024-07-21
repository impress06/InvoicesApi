import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  let user = true;
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
