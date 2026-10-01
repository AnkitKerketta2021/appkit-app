import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
