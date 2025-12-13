import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth.hook";

const GuestRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/admin/blog" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
