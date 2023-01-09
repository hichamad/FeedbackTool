import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protected Route, routes wrapped by this route are required to be signed in as an Admin. 
function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();
  // Check if a Admin is loggedin
  if (!userLoggedIn) {
    console.log("test");
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
