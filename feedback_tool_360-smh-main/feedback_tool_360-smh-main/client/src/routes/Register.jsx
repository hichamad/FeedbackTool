import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/AdminSystem/RegisterForm";
import NavBar from "../components/ApplicationWide/NavBar";
import { useAuth } from "../context/AuthContext";

// Register Page
function Register() {
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
      <RegisterForm />
    </div>
  );
}

export default Register;
