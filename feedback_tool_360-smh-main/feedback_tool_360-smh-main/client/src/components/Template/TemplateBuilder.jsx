import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import logo from "../../../src/assets/images/dyflexis.svg";
import { QuestionListContext } from "../../context/Context";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useNavigate } from "react-router-dom";
import OpenQuestion from "../BuildForm/OpenQuestion";
import RatingQuestion from "../BuildForm/RatingQuestion";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

function TemplateBuilder() {
  // UseStates
  const [questionlist, updateQuestionlist] = useState([]);
  const [onderwerp, setOnderwerp] = useState("");
  const [openVraag, setOpenVraag] = useState("");
  const [openVraagRequired, setOpenVraagRequired] = useState(false);
  const [ratingVraag, setRatingVraag] = useState("");
  const [showTemplateBuilderDone, setShowTemplateBuilderDone] = useState(false);
  const navigate = useNavigate();

  const setOpenVraagValue = (event) => {
    setOpenVraag(event);
  };

  const setOpenVraagFieldRequired = (event) => {
    setOpenVraagRequired(event);
  };

  const setRatingVraagValue = (event) => {
    setRatingVraag(event);
  };

  // Add question to the questionlist
  const addQuestion = (questiontype, e, required) => {
    e.preventDefault();
    if (questiontype === "Open vraag") {
      if (openVraag === "") {
        return;
      }
    }
    if (questiontype === "Rating vraag") {
      if (ratingVraag === "") {
        return;
      }
    }
    document.getElementById("ratingvraag").value = "";
    document.getElementById("openvraag").value = "";
    // Check for Questiontype = Open Vraag
    if (questiontype === "Open vraag") {
      const uuid = crypto.randomUUID().toString();
      const newQuestion = {
        id: uuid,
        questiontype: "Open vraag",
        question: openVraag,
        required: required,
        useremail: "",
        usercompletename: "Niet bekend",
        answer: "",
      };
      required = false;
      updateQuestionlist((oldArray) => [...oldArray, newQuestion]);
      setOpenVraag("");
      setOpenVraagRequired(false);
    }

    // Check for Questiontype = Rating vraag
    if (questiontype === "Rating vraag") {
      const uuid = crypto.randomUUID().toString();
      const newQuestion = {
        id: uuid,
        questiontype: "Rating vraag",
        question: ratingVraag,
        useremail: "",
        usercompletename: "Niet bekend",
        answer: "",
      };
      updateQuestionlist((oldArray) => [...oldArray, newQuestion]);
      setRatingVraag("");
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      questionlist,
      result.source.index,
      result.destination.index
    );
    console.log(JSON.stringify(reorderedItems));
    updateQuestionlist(reorderedItems);
  };

  const createTemplate = (event) => {
    event.preventDefault();
    if (onderwerp === "") {
      return;
    }
    if (questionlist.length === 0) {
      return;
    }
    const guid = crypto.randomUUID().toString();
    const adminUserName = sessionStorage.getItem("feedbacktool_adminusername");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templateid: guid,
      surveyadminusername: adminUserName,
      templatename: onderwerp,
      templatequestionlist: JSON.stringify(questionlist),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/api/v1/template/create", requestOptions)
      .then((response) => response.text())
      .then(setShowTemplateBuilderDone(true))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container mx-auto ">
      <FadeIn>
        {!showTemplateBuilderDone ? (
          <div className="flex justify-evenly mb-20">
            <div className="w-full text-center border-2 max-w-[600px] bg-white shadow-md rounded-lg">
              <img src={logo} className="h-14 mx-auto m-2" />
              <form>
                <div className="p-10">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="question">
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {questionlist.map(
                            (
                              { id, questiontype, question, required },
                              index
                            ) => {
                              return (
                                <Draggable
                                  key={id}
                                  draggableId={id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className=""
                                    >
                                      <QuestionListContext.Provider
                                        value={{
                                          questionlist,
                                          updateQuestionlist,
                                        }}
                                      >
                                        {questiontype === "Open vraag" ? (
                                          <FadeIn>
                                            <OpenQuestion
                                              questionname={question}
                                              id={id}
                                              required={required}
                                            />
                                          </FadeIn>
                                        ) : (
                                          <FadeIn>
                                            <RatingQuestion
                                              questionname={question}
                                              id={id}
                                            />
                                          </FadeIn>
                                        )}
                                      </QuestionListContext.Provider>
                                    </li>
                                  )}
                                </Draggable>
                              );
                            }
                          )}
                          {provided.placeholder}
                          {questionlist.length === 0 && (
                            <FadeIn>
                              <h2 className="font-medium text-xl mt-60">
                                Begin met vragen toe te voegen via het rechter
                                menu -{">"}
                              </h2>
                            </FadeIn>
                          )}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </form>
            </div>
            <div className="w-full border-2 h-[750px] max-w-[600px] shadow-md bg-white rounded-lg">
              <FadeIn>
                <h2 className="text-center text-2xl font-medium mt-2">
                  Template maken
                </h2>
                <div className="p-5">
                  <ThemeProvider theme={buttontheme}>
                    <div className="border-2 p-5 rounded-md bg-white shadow-md">
                      <h2 className="font-medium text-lg mb-2">
                        Naam template
                      </h2>
                      <TextField
                        id="onderwerp"
                        label="Onderwerp"
                        variant="outlined"
                        onChange={(event) => setOnderwerp(event.target.value)}
                      />
                    </div>
                    <br />
                    <form className="border-2 p-5 rounded-md bg-white shadow-md">
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={(e) =>
                          addQuestion("Open vraag", e, openVraagRequired)
                        }
                        className="mb-10"
                      >
                        <AddIcon /> Voeg Open Vraag toe
                      </Button>
                      <br />
                      <br />
                      <TextField
                        id="openvraag"
                        label="Wat voor vraag?"
                        variant="outlined"
                        onChange={(event) =>
                          setOpenVraagValue(event.target.value)
                        }
                      />
                      <br />
                      <FormControlLabel
                        onChange={(event) =>
                          setOpenVraagFieldRequired(event.target.checked)
                        }
                        control={<Checkbox />}
                        checked={openVraagRequired === true ? true : false}
                        label="Verplicht"
                      />
                    </form>
                    <form className="mt-4 border-2 p-5 rounded-md bg-white shadow-md">
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={(e) => addQuestion("Rating vraag", e)}
                      >
                        <AddIcon /> Voeg Rating Vraag toe
                      </Button>
                      <br />
                      <br />
                      <TextField
                        id="ratingvraag"
                        label="Wat voor vraag?"
                        variant="outlined"
                        onChange={(event) =>
                          setRatingVraagValue(event.target.value)
                        }
                      />
                    </form>
                    <form className="mt-4 border-2 p-5 rounded-md bg-white shadow-md">
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        onClick={(event) => createTemplate(event)}
                      >
                        <CheckIcon /> Maak template
                      </Button>
                    </form>
                  </ThemeProvider>
                </div>
              </FadeIn>
            </div>
          </div>
        ) : (
          <FadeIn>
            <div className="border-2 text-center p-10 mt-40 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl">
                Jouw template is succesvol aangemaakt:{" "}
              </h2>
              <p className="text-lg mt-4">
                Je kan nu dit template gebruiken als je een nieuwe vragenlijst
                maakt via het Admin Dashboard
              </p>
              <div className="mt-4 flex justify-evenly max-w-xl mx-auto">
                <ThemeProvider theme={buttontheme}>
                  <Button
                    onClick={() => navigate("/admindashboard")}
                    variant="contained"
                  >
                    Ga naar Admin Dashboard
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </FadeIn>
        )}
      </FadeIn>
    </div>
  );
}

export default TemplateBuilder;
