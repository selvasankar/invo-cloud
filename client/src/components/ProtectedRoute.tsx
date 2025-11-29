import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (auth?.loading) return <div>Loading...</div>;
  if (!auth?.token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
