import { ReactChild } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: {
  children: any;
}) => {
  const user = JSON.parse(localStorage.getItem("checkrommie__user")!)
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }: { children: any }) => {
  const user = JSON.parse(localStorage.getItem("checkrommie__user")!)
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default ProtectedRoute;
