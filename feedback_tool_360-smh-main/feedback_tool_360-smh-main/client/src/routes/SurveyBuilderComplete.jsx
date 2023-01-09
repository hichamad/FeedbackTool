import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/ApplicationWide/NavBar";
import { buttontheme } from "../themes/ButtonTheme";

// Surveybuilder Complete Page
function SurveyBuilderComplete() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSurvey = () => {
    navigate("/survey/" + location.state.guid);
  };
  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <FadeIn>
          <div className="border-2 text-center p-10 mt-40 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl">
              Jouw unieke Vragenlijst ID is:{" "}
              <span className="font-medium">{location.state.guid}</span>
            </h2>
            <p className="text-lg mt-4">
              Deel dit ID met uw collega's zodat zij deze vragenlijst kunnen
              invullen.
            </p>
            <div className="mt-4 flex justify-evenly max-w-xl mx-auto">
              <ThemeProvider theme={buttontheme}>
                <Button
                  className="mr-4"
                  onClick={goToSurvey}
                  variant="contained"
                >
                  Ga naar aangemaakte vragenlijst
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttontheme}>
                <Button
                  onClick={() => navigate("/admindashboard")}
                  variant="contained"
                >
                  Ga naar admin dashboard
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default SurveyBuilderComplete;
