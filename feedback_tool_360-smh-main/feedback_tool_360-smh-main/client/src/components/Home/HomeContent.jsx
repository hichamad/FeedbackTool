import { Alert, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import FadeIn from "react-fade-in/lib/FadeIn";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import { useNavigate } from "react-router-dom";

function HomeContent() {
  const navigate = useNavigate();
  const [surveyId, setSurveyId] = useState("");
  const [surveyNotFound, setSurveyNotFound] = useState(false);

  const goToSurvey = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      surveyaccessid: surveyId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://127.0.0.1:5000/api/v1/survey/get", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const responseResult = JSON.parse(result);
        responseResult[Object.keys(responseResult)[0]] == "No survey found"
          ? setSurveyNotFound(true)
          : navigate("/survey/" + surveyId);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="container mx-auto">
      <FadeIn>
        <form onSubmit={(event) => goToSurvey(event)}>
          <div className="mx-auto text-center my-auto border-2 p-10 max-w-6xl mt-40 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl mb-10">
              Vragenlijst code ontvangen? Vul hem hieronder in.
            </h2>
            <ThemeProvider theme={buttontheme}>
              <TextField
                id="surveyid"
                variant="outlined"
                className="w-full"
                placeholder="Vragenlijst code"
                onChange={(e) => setSurveyId(e.target.value)}
                style={{ fontSize: "20px" }}
              />
              <br />
              <br />
              {surveyNotFound && (
                <FadeIn className="mb-4">
                  <Alert severity="error">
                    Er is geen vragenlijst gevonden met dit ID
                  </Alert>
                </FadeIn>
              )}

              <Button type="submit" variant="contained" className="mb-10 ">
                Ga naar vragenlijst
              </Button>
            </ThemeProvider>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}

export default HomeContent;
