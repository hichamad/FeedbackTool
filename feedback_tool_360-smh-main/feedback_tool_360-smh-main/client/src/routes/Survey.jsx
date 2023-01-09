import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/ApplicationWide/NavBar";
import SurveyForm from "../components/SurveyForm/SurveyForm";

// Surveyform page
function Survey() {
  let params = useParams();
  return (
    <div>
      <NavBar />
      <SurveyForm surveyid={params.surveyid} />
    </div>
  );
}

export default Survey;
