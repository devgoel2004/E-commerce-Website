import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    if (isAuthenticated && !isAuthenticated) {
      return <Navigate to="/shopfusion/login" />;
    }
  }
  if (loading) {
    if (isAdmin && user && user.role !== "admin") {
      return <Navigate to="/shopfusion/login" />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
