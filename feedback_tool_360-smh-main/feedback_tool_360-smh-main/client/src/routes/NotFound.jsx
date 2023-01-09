import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/ApplicationWide/NavBar";
import { buttontheme } from "../themes/ButtonTheme";

// NotFound page
function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="bg-white max-w-xl mx-auto p-5 rounded-lg">
          <h1 className="text-center font-medium text-3xl">Oeps!</h1>
          <p className="text-center text-xl">Deze pagina bestaat niet!</p>
          <div className="flex justify-center mt-4">
            <ThemeProvider theme={buttontheme}>
              <Button onClick={() => navigate("/")} variant="contained">
                Naar hoofdpagina
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
