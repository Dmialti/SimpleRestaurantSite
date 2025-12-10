import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth.hook";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner className="h-screen" />;

  if (!user) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};
export default ProtectedRoute;
