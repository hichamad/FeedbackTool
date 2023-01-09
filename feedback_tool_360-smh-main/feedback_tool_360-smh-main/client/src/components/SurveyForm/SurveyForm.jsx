import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import OpenQuestionUser from "./OpenQuestionUser";
import RatingQuestionUser from "./RatingQuestionUser";
import logo from "../../../src/assets/images/dyflexis.svg";
import FadeIn from "react-fade-in/lib/FadeIn";
import { QuestionAnswerListContext } from "../../context/Context";
import SurveyComplete from "./SurveyComplete";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import { useNavigate } from "react-router-dom";

function SurveyForm(props) {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const [questionAnswerList, setQuestionAnswerList] = useState([]);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [userRequired, setUserRequired] = useState(false);
  const [userRequiredSaved, setUserRequiredSaved] = useState(false);
  const [surveyActive, setSurveyActive] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userCompleteName, setUserCompleteName] = useState("");
  const [surveySubject, setSurveySubject] = useState("");

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      surveyaccessid: props.surveyid,
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
        let notFound = false;
        const jsonResult = JSON.parse(result);
        if (jsonResult[Object.keys(jsonResult)[0]] == "No survey found") {
          setShowNotFound(true);
          notFound = true;
        }
        if (notFound == false) {
          if (userRequiredSaved === false) {
            console.log(jsonResult.userrequired);
            setUserRequired(jsonResult.userrequired);
          }
          setQuestionList(JSON.parse(jsonResult.surveyquestionlist));
          setQuestionAnswerList(JSON.parse(jsonResult.surveyquestionlist));
          setSurveySubject(jsonResult.surveysubject);
          setSurveyActive(jsonResult.surveyactive);
        }
      })
      .catch((error) => console.log("error", error));
  }, [userRequired, setUserRequired]);

  const submitSurvey = (event) => {
    event.preventDefault();
    const questionAnswers = JSON.stringify(questionAnswerList);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      surveyaccessid: props.surveyid,
      answers: questionAnswers,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://127.0.0.1:5000/api/v1/survey/setanswers", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setSurveyComplete(true);
      })
      .catch((error) => console.log("error", error));
  };
  const setUserSurvey = (event) => {
    event.preventDefault();
    setUserRequired(!userRequired);
    setUserRequiredSaved(true);
  };
  return (
    <div className="container mx-auto ">
      <div className="max-w-[600px] mx-auto">
        <FadeIn>
          <div className="text-center border-2 mb-10 p-10 min-w-full   bg-white shadow-md rounded-lg">
            {showNotFound == false ? (
              surveyActive ? (
                userRequired ? (
                  <FadeIn>
                    <div className="p-10">
                      <h2 className="font-medium text-2xl mb-4">
                        Voor deze vragenlijst is het verplicht om persoonlijke
                        gegevens in te vullen.
                      </h2>
                      <form onSubmit={(event) => setUserSurvey(event)}>
                        <TextField
                          className="w-96"
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          required
                          onChange={(event) => setUserEmail(event.target.value)}
                        />
                        <br />
                        <br />
                        <TextField
                          className="w-96"
                          id="outlined-basic"
                          label="Voornaam + Achternaam"
                          variant="outlined"
                          required
                          onChange={(event) =>
                            setUserCompleteName(event.target.value)
                          }
                        />
                        <div className="mt-4">
                          <ThemeProvider theme={buttontheme}>
                            <Button variant="contained" type="submit">
                              Verstuur Persoonlijke Gegevens
                            </Button>
                          </ThemeProvider>
                        </div>
                      </form>
                    </div>
                  </FadeIn>
                ) : (
                  <FadeIn>
                    {surveyComplete && (
                      <FadeIn>
                        <SurveyComplete />
                      </FadeIn>
                    )}
                    {!surveyComplete && (
                      <form onSubmit={(event) => submitSurvey(event)}>
                        {userRequiredSaved == false && (
                          <h2 className="text-center text-2xl mt-2 mx-2">
                            U kunt deze vragenlijst
                            <span className="font-medium"> Anoniem </span>
                            invullen
                          </h2>
                        )}
                        <img src={logo} className="h-14 mx-auto m-2" />
                        <h2 className="text-2xl">
                          <span className="font-medium">Onderwerp: </span>
                          {surveySubject}
                        </h2>
                        <div className="">
                          {questionList.map((question) => {
                            return (
                              <div className="" key={question.id}>
                                <FadeIn>
                                  <QuestionAnswerListContext.Provider
                                    value={{
                                      questionAnswerList,
                                      setQuestionAnswerList,
                                    }}
                                  >
                                    {question.questiontype === "Open vraag" ? (
                                      <OpenQuestionUser
                                        questionid={question.id}
                                        vraag={question.question}
                                        required={question.required}
                                        useremail={userEmail}
                                        usercompletename={userCompleteName}
                                      />
                                    ) : (
                                      <RatingQuestionUser
                                        questionid={question.id}
                                        vraag={question.question}
                                        useremail={userEmail}
                                        usercompletename={userCompleteName}
                                      />
                                    )}
                                  </QuestionAnswerListContext.Provider>
                                </FadeIn>
                              </div>
                            );
                          })}
                          <div className="mt-4">
                            <Button type="submit" variant="contained">
                              Verstuur antwoorden
                            </Button>
                          </div>
                        </div>
                      </form>
                    )}
                  </FadeIn>
                )
              ) : (
                <div>
                  <h2 className="font-medium text-2xl">
                    Deze vragenlijst is momenteel niet actief
                  </h2>
                  <p className="mb-4">
                    Contacteer de maker van deze vragenlijst voor eventuele
                    vragen
                  </p>
                  <ThemeProvider theme={buttontheme}>
                    <Button variant="contained" onClick={() => navigate("/")}>
                      Terug naar hoofdpagina
                    </Button>
                  </ThemeProvider>
                </div>
              )
            ) : (
              <div>
                <h2 className="font-medium text-2xl">
                  Deze vragenlijst bestaat niet
                </h2>
                <p className="mb-4">
                  Contacteer de maker van wie je code hebt gekregen voor
                  eventuele vragen
                </p>
                <ThemeProvider theme={buttontheme}>
                  <Button variant="contained" onClick={() => navigate("/")}>
                    Terug naar hoofdpagina
                  </Button>
                </ThemeProvider>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default SurveyForm;
