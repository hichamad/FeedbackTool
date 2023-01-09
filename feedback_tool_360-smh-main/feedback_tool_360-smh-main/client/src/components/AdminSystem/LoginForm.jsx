import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttontheme } from "../../themes/ButtonTheme";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useAuth } from "../../context/AuthContext";
function LoginForm() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth();
  const loginAdmin = () => {
    // Login method in the AuthContext
    login(loginEmail, loginPassword);
  };
  // Loginform component
  return (
    <div className="container p-2 mx-auto ">
      <FadeIn>
        <div className="border-2 text-center bg-white rounded-md">
          <ThemeProvider theme={buttontheme}>
            <h2 className="text-4xl my-5">Nog geen account?</h2>
            <Button
              onClick={() => navigate("/register")}
              variant="contained"
              className="text-xl w-52 rounded-md m-16"
              style={{ fontWeight: "600", padding: "15px" }}
            >
              Registreer
            </Button>
            <h2 className="text-4xl my-5">
              Inloggen bij Dyflexis Feedback Tool
            </h2>
            <div className="mx-5"></div>

            <form className="">
              {/* <input
            placeholder="Gebruikersnaam"
            id="username"
            type={"text"}
            autoComplete="current-username"
            onChange={(e) => setLoginUsername(e.target.value)}
            className="border-2 block mx-auto rounded-md my-1 py-2 w-96 text-2xl"
          /> */}
              <input
                placeholder="Email"
                id="email"
                type={"email"}
                autoComplete="current-email"
                onChange={(e) => setLoginEmail(e.target.value)}
                className="border-2 block mx-auto rounded-md my-1 py-2 w-96 text-2xl"
              />
              <input
                placeholder="Wachtwoord"
                id="wachtwoord"
                type={"password"}
                autoComplete="current-password"
                onChange={(e) => setLoginPassword(e.target.value)}
                className="border-2 block mx-auto rounded-md py-2 w-96 text-2xl"
              />
              <div className="my-2">
                <Button
                  onClick={(event) => loginAdmin(event.target.value)}
                  variant="contained"
                  className="text-xl w-52 rounded-md m-16"
                  style={{ fontWeight: "600", padding: "15px" }}
                >
                  Login
                </Button>
              </div>
            </form>
          </ThemeProvider>
        </div>
      </FadeIn>
    </div>
  );
}

export default LoginForm;
