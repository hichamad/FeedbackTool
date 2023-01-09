import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import FadeIn from "react-fade-in/lib/FadeIn";
import PersonIcon from "@mui/icons-material/Person";
import {
  BlackButton,
  GreenButton,
  OrangeButton,
} from "../../themes/ButtonTheme";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SettingsIcon from "@mui/icons-material/Settings";
import NumbersIcon from "@mui/icons-material/Numbers  ";
import CodeIcon from "@mui/icons-material/Code";
import PollIcon from "@mui/icons-material/Poll";
import SubjectIcon from "@mui/icons-material/Subject";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useAuth } from "../../context/AuthContext";
function AdminDashBoardSurveys() {
  const [adminSurveys, setAdminSurveys] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [adminCompleteName, setAdminCompleteName] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!refresh) {
      setRefresh(false);
    }
    const adminUsername = sessionStorage.getItem("feedbacktool_adminusername");
    setAdminCompleteName(adminUsername);
    const data = JSON.stringify({
      adminusername: adminUsername,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/admin/getsurveys",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config).then(function (response) {
      setAdminSurveys(response.data.surveys);
    });
    setRefresh(false);
  }, [refresh]);

  const logOutAdmin = () => {
    // Logout method from AuthContext
    logout();
  };

  const seeAnswers = (surveyaccessid) => {
    navigate("/surveyanswers", {
      state: { surveyaccessid: surveyaccessid },
    });
  };

  const updateSurvey = (surveyaccessid) => {
    navigate("/surveybuilderupdate", {
      state: { surveyaccessid: surveyaccessid },
    });
  };

  const deleteSurvey = (surveyaccessid) => {
    if (confirm("Weet je het zeker?") == false) {
      return;
    }
    const data = JSON.stringify({
      surveyaccessid: surveyaccessid,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/survey/deletesurvey",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto ">
      <div className="mb-20">
        <FadeIn>
          <div className="my-4 bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-center text-3xl mb-4">
              Welkom, {adminCompleteName}
            </h2>
            <div className="flex justify-center space-x-4">
              <ThemeProvider theme={buttontheme}>
                <Button
                  onClick={() => navigate("/templatebuilder")}
                  variant="contained"
                >
                  Maak een Template
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttontheme}>
                <Button
                  onClick={() => navigate("/surveybuilder")}
                  variant="contained"
                >
                  Maak een vragenlijst
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttontheme}>
                <Button onClick={logOutAdmin} variant="contained" color="error">
                  Log uit
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          {adminSurveys.length !== 0 ? (
            adminSurveys.map((survey, index) => {
              return (
                <div key={survey.surveyaccessid} className="m-2">
                  <FadeIn>
                    <div className="border-2 max-w-4xl mx-auto mb-4 bg-white shadow-lg rounded-lg p-5">
                      <h2 className="text-2xl mb-2">
                        <span className="font-medium">
                          <PollIcon /> Vragenlijstnummer: {index + 1}
                        </span>
                      </h2>
                      <p className="text-lg">
                        <span className="font-medium">
                          <SubjectIcon /> Onderwerp:{" "}
                        </span>
                        {survey.surveysubject}
                      </p>
                      <p className="text-lg">
                        <span className="font-medium w-[150px]">
                          <PersonIcon /> Zichtbaarheid:{" "}
                        </span>{" "}
                        {survey.userrequired
                          ? "Gebruiker moet inloggen"
                          : "Anoniem"}
                      </p>
                      <p className="text-lg">
                        <span className="font-medium">
                          <CodeIcon /> Vragenlijstcode:{" "}
                        </span>{" "}
                        {survey.surveyaccessid}
                      </p>
                      <p className="text-lg">
                        <span className="font-medium">
                          <NumbersIcon /> Aantal keer ingevuld:{" "}
                        </span>
                        {survey.answers.length > 0
                          ? survey.answers.length
                          : "Nog niet ingevuld"}
                      </p>
                      <p className="text-lg">
                        <span className="font-medium">
                          {survey.surveyactive ? (
                            <ToggleOnIcon sx={{ color: "green" }} />
                          ) : (
                            <ToggleOffIcon sx={{ color: "red" }} />
                          )}{" "}
                        </span>
                        {survey.surveyactive ? (
                          <span className="text-green-500">
                            Vragenlijst is actief
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Vragenlijst is niet actief
                          </span>
                        )}
                      </p>
                      <div className="flex justify-center space-x-2 mt-4">
                        <ThemeProvider theme={buttontheme}>
                          <GreenButton
                            onClick={() =>
                              navigator.clipboard.writeText(
                                survey.surveyaccessid
                              )
                            }
                            variant="contained"
                            sx={{ backgroundColor: "#45ac10" }}
                          >
                            <ContentCopyIcon /> Kopieer code
                          </GreenButton>
                          <OrangeButton
                            onClick={() => seeAnswers(survey.surveyaccessid)}
                            variant="contained"
                          >
                            <RemoveRedEyeIcon /> Bekijk antwoorden
                          </OrangeButton>
                          <BlackButton
                            onClick={() => updateSurvey(survey.surveyaccessid)}
                            variant="contained"
                          >
                            <SettingsIcon /> Instellingen vragenlijst
                          </BlackButton>
                          <Button
                            onClick={() => deleteSurvey(survey.surveyaccessid)}
                            variant="contained"
                            color="error"
                          >
                            <DeleteIcon />
                            Verwijder vragenlijst
                          </Button>
                        </ThemeProvider>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
              <FadeIn className="border-2 text-center p-10 shadow-lg rounded-lg text-2xl">
                <h2 className="">U heeft nog geen vragenlijsten aangemaakt.</h2>
              </FadeIn>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

export default AdminDashBoardSurveys;
