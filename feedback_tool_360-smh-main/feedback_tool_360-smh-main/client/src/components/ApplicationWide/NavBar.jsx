import { Button } from "@mui/material";
import React from "react";
import logo from "../../../src/assets/images/dyflexis.svg";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-white mb-5 shadow-md h-[100px]">
      <nav className="container mx-auto py-2 px-2 my-auto">
        <div className="flex justify-between my-auto  mt-[1%]">
          <div className="flex justify-center">
            <Link to={"/"}>
              <img src={logo} className="h-12 my-auto" />
            </Link>
          </div>
          <ThemeProvider theme={buttontheme}>
            <Button
              onClick={() => navigate("/login")}
              className="my-auto"
              type="submit"
              variant="contained"
            >
              Admin Account
            </Button>
          </ThemeProvider>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
