import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// The context
const AuthContext = createContext(null);

// The context Provider
export const AuthProvider = ({ children }) => {
  // States
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  // Function for validating correct email
  function validateEmail() {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      email
    );
  }

  // Function for logging in as an Admin
  function login(email, password) {
    const data = JSON.stringify({
      adminemail: email,
      adminpassword: password,
    });

    // Configuration for the POST call
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/admin/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    // the POST call
    axios(config)
      .then(function (response) {
        if (
          response.data.message == "Invalid credentials" ||
          response.data.message == "Email does not exist"
        ) {
          alert("Verkeerde inloggegevens!");
        } else {
          sessionStorage.setItem("feedbacktool_isloggedin", true);
          sessionStorage.setItem(
            "feedbacktool_adminusername",
            response.data.adminusername
          );
          setUserLoggedIn("true");
          navigate("/admindashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function for Registering as an Admin
  function register(username, email, password) {
    const data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    // Username, Email and password checks
    if (email.trim().length !== 0) {
      console.log("Email is NOT empty");
    } else {
      alert("Email is empty");
      return;
    }

    if (validateEmail() == false) {
      alert("Please enter valid email address.");
      return;
    }

    if (username.trim().length !== 0) {
      console.log("Username is NOT empty");
    } else {
      alert("Username is empty");
      return;
    }

    const str1 = 'hello world 1';
    const str2 = 'hello world 2';

    function containsNumber(str) {
      return /\d/.test(str);
    }

    console.log(containsNumber(str1));
    console.log(containsNumber(str2));

    if (containsNumber(username) == true) {
      alert("Please only enter letters");
      return;
    }

    if (password.trim().length !== 0) {
      console.log("Password NOT empty");
    } else {
      alert("Password is empty");
      return;
    }
    if (validateEmail() == false) {
      return;
    }
    // Configuration for the POST call
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/admin/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // the POST call
    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data?.message == "Admin already exists") {
          alert("Admin account bestaat al!");
          return;
        } else {
          sessionStorage.setItem("feedbacktool_isloggedin", true);
          sessionStorage.setItem("feedbacktool_adminusername", username);
          navigate("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function for logging out as an Admin
  function logout() {
    // Clear the session and navigate to the Home page
    sessionStorage.removeItem("feedbacktool_isloggedin");
    sessionStorage.removeItem("feedbacktool_adminusername");
    setUserLoggedIn("false");
    navigate("/");
  }

  // Check if admin is in Session
  useEffect(() => {
    if (sessionStorage.getItem("feedbacktool_isloggedin") == "true") {
      console.log("YO");
      setUserLoggedIn("true");
      navigate("/admindashboard");
    }
  }, []);

  // Return the provider with all of the methods from above
  return (
    <AuthContext.Provider
      value={{ username, userLoggedIn, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Our hook that acceses all of the Context
export function useAuth() {
  return useContext(AuthContext);
}
