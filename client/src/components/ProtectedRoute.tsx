import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {user} = useUser();

  if (!user?.accessToken) return <Navigate to="/" replace={true}></Navigate>;
  return children;
};

export default ProtectedRoute;
