import React, { useState } from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useAuth } from "../../context/AuthContext";

function RegisterForm() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { register } = useAuth();
  const registerAdmin = (event) => {
    event.preventDefault();
    // Register method in the AuthContext
    register(registerUsername, registerEmail, registerPassword);
  };
  // Register form component
  return (
    <div className="container p-2 mx-auto ">
      <FadeIn>
        <div className="border-2 text-center bg-white rounded-md">
          <h2 className="text-4xl my-5">
            Registreren bij Dyflexis Feedback Tool
          </h2>
          <form>
            <input
              placeholder="Volledige naam"
              id="username"
              type={"text"}
              autoComplete="new-username"
              onChange={(event) => setRegisterUsername(event.target.value)}
              className="border-2 block mx-auto rounded-md my-1 py-2 w-96 text-2xl"
            />
            <input
              placeholder="Email"
              id="email"
              type={"email"}
              autoComplete="new-email"
              onChange={(event) => setRegisterEmail(event.target.value)}
              className="border-2 block mx-auto rounded-md my-1 py-2 w-96 text-2xl"
            />

            <input
              placeholder="Wachtwoord"
              id="wachtwoord"
              type={"password"}
              autoComplete="new-password"
              onChange={(event) => setRegisterPassword(event.target.value)}
              className="border-2 block mx-auto rounded-md py-2 w-96 text-2xl"
            />
            <div className="my-2">
              <ThemeProvider theme={buttontheme}>
                <Button
                  variant="contained"
                  className="text-xl w-52 rounded-md m-16"
                  type="submit"
                  onClick={(event) => registerAdmin(event)}
                  style={{ fontWeight: "600", padding: "15px" }}
                >
                  Registreer
                </Button>
              </ThemeProvider>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}

export default RegisterForm;
