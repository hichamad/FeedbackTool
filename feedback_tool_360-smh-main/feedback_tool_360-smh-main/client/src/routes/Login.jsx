import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/AdminSystem/LoginForm";
import NavBar from "../components/ApplicationWide/NavBar";
import { useAuth } from "../context/AuthContext";

// Login Page
function Login() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Check if a Admin is loggedin
  useEffect(() => {
    if (userLoggedIn == "true") {
      navigate("/admindashboard");
    }
  }, [userLoggedIn, navigate]);
  return (
    <div>
      <NavBar />
      <LoginForm />
    </div>
  );
}

export default Login;
