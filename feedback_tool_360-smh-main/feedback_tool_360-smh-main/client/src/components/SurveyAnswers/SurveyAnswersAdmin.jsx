import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import OpenQuestionAnswer from "../SurveyAnswers/OpenQuestionAnswer";
import RatingQuestionAnswer from "../SurveyAnswers/RatingQuestionAnswer";
import FadeIn from "react-fade-in/lib/FadeIn";
import printPDF from "../../assets/helpers/PrintPDF";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import { Button } from "@mui/material";
import { printExcel, printJson } from "../../assets/helpers/printExcel&JSON";
function SurveyAnswersAdmin() {
  const location = useLocation();
  const [surveyQuestionAnswers, setSurveyQuestionAnswers] = useState([]);
  const [surveySubject, setSurveySubject] = useState("");
  const [userRequired, setUserRequired] = useState(false);

  useEffect(() => {
    const data = JSON.stringify({
      surveyaccessid: location.state.surveyaccessid,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/survey/getanswers",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // API call that gets all the answers for a survey and then parses it to JSON and adds it to a useState.
    axios(config)
      .then(function (response) {
        setSurveySubject(response.data.surveysubject);
        setUserRequired(response.data.userrequired);
        for (var i in response.data.answers) {
          setSurveyQuestionAnswers((surveyQuestionAnswers) => [
            ...surveyQuestionAnswers,
            JSON.parse(response.data.answers[i]),
          ]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto ">
      <FadeIn>
        <FadeIn>
          <div className=" mx-auto bg-white p-10 rounded-lg shadow-lg max-w-[600px] mb-4">
            <h2 className="text-3xl text-center mb-4">
              Aantal keer ingevuld: {surveyQuestionAnswers.length}
            </h2>
            {userRequired ? (
              <p className="text-large text-center">
                <span className="font-medium">Zichtbaarheid: </span>
                <span>Gebruiker moet inloggen</span>
              </p>
            ) : (
              <p className="text-large text-center">
                <span className="font-medium">Zichtbaarheid: </span>
                <span>Gebruiker hoeft niet in te loggen</span>
              </p>
            )}
            {surveyQuestionAnswers.length > 0 && (
              <FadeIn>
                <div>
                  <h2 className="text-2xl text-center mb-4">Export Methodes</h2>
                  <div className="flex justify-center space-x-10">
                    <ThemeProvider theme={buttontheme}>
                      <Button variant="contained" onClick={printPDF}>
                        PDF
                      </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={buttontheme}>
                      <Button
                        variant="contained"
                        onClick={() => printExcel(surveyQuestionAnswers)}
                      >
                        Excel
                      </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={buttontheme}>
                      <Button
                        variant="contained"
                        onClick={() => printJson(surveyQuestionAnswers)}
                      >
                        JSON
                      </Button>
                    </ThemeProvider>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </FadeIn>
        <div
          id="surveyanswers"
          className="rounded-lg mb-10 max-w-[600px] mx-auto"
        >
          {surveyQuestionAnswers.length == 0 ? (
            <FadeIn className="mx-auto flex justify-center ">
              <h2 className="border-2 p-10 shadow-lg rounded-lg text-2xl text-center bg-white">
                Er zijn nog geen antwoorden voor deze vragenlijst bekend!
              </h2>
            </FadeIn>
          ) : (
            surveyQuestionAnswers.map((question, index) => {
              return (
                <FadeIn key={crypto.randomUUID()}>
                  <div className="mx-auto w-full max-w-[600px] mb-4 break-inside-avoid rounded-lg">
                    <div className="break-inside-avoid shadow-lg rounded-lg">
                      <div className="mx-auto p-10  bg-white border-2 break-inside-avoid rounded-lg">
                        <h2 className="text-center text-2xl font-medium">
                          {surveySubject}
                        </h2>
                        <p className="text-center">
                          <span className="font-medium">Antwoord: </span>
                          {index + 1}
                        </p>
                        {userRequired ? (
                          <h2 className="text-center">
                            <span className="font-medium">Ingevuld door: </span>
                            <span>
                              {question[0].usercompletename ? (
                                <span>{question[0].usercompletename}</span>
                              ) : (
                                <span>Niet bekend</span>
                              )}
                            </span>
                          </h2>
                        ) : (
                          <h2 className="text-center">
                            <span className="font-medium">Ingevuld door: </span>
                            Anoniem
                          </h2>
                        )}
                        {question.map((question) => {
                          return (
                            <FadeIn key={crypto.randomUUID()}>
                              <div className="flex justify-center break-inside-avoid">
                                {question.questiontype === "Open vraag" ? (
                                  <OpenQuestionAnswer
                                    vraag={question.question}
                                    required={question.required}
                                    answer={question.answer}
                                  />
                                ) : (
                                  <RatingQuestionAnswer
                                    vraag={question.question}
                                    answer={question.answer}
                                  />
                                )}
                              </div>
                            </FadeIn>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export default SurveyAnswersAdmin;
