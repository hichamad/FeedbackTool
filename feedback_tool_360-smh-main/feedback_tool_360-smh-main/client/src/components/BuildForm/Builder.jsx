import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
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

function Builder() {
  const [questionlist, updateQuestionlist] = useState([]);
  const [onderwerp, setOnderwerp] = useState("");
  const [openVraag, setOpenVraag] = useState("");
  const [openVraagRequired, setOpenVraagRequired] = useState(false);
  const [ratingVraag, setRatingVraag] = useState("");
  const [userRequired, setUserRequired] = useState(false);
  const [surveyActive, setSurveyActive] = useState(true);
  const [showMaximumResponses, setShowMaximumResponses] = useState(false);
  const [maximumResponses, setMaximumResponses] = useState(0);
  const [adminTemplates, setAdminTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserName = sessionStorage.getItem("feedbacktool_adminusername");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      adminusername: adminUserName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/api/v1/template/gettemplates", requestOptions)
      .then(function (response) {
        response.json().then(function (data) {
          setAdminTemplates(data.templates);
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  const setOpenVraagValue = (event) => {
    setOpenVraag(event);
  };

  const setOpenVraagFieldRequired = (event) => {
    setOpenVraagRequired(event);
  };

  const setRatingVraagValue = (event) => {
    setRatingVraag(event);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      templatename: event.target.value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/api/v1/template/gettemplate", requestOptions)
      .then(function (response) {
        response.json().then(function (data) {
          updateQuestionlist(JSON.parse(data.templatequestionlist));
        });
      })
      .catch((error) => console.log("error", error));
  };

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

    // If the questiontype is Open Vraag make a openvraag question and add it to the list
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
      // Update the Questionlist
      updateQuestionlist((oldArray) => [...oldArray, newQuestion]);
      setOpenVraag("");
      setOpenVraagRequired(false);
    }

    // If the questiontype is Rating Vraag make a rating vraag question and add it to the list
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
      // Update the Questionlist
      updateQuestionlist((oldArray) => [...oldArray, newQuestion]);
      setRatingVraag("");
    }
  };

  // Set the new order of the questionlist
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Questioncard cannot be dropped outside the droparea
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Reorder all of the items and update the State
    const reorderedItems = reorder(
      questionlist,
      result.source.index,
      result.destination.index
    );
    updateQuestionlist(reorderedItems);
  };

  const createForm = (event) => {
    event.preventDefault();
    if (onderwerp === "") {
      return;
    }
    if (questionlist.length === 0) {
      return;
    }
    const guid = crypto.randomUUID().toString();
    const adminUserName = sessionStorage.getItem("feedbacktool_adminusername");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // The document that get pushed to MongoDB
    const raw = JSON.stringify({
      surveyaccessid: guid,
      surveyactive: surveyActive,
      userrequired: userRequired,
      surveymaximumresponsesenabled: showMaximumResponses,
      surveymaximumresponses: maximumResponses,
      surveyadminusername: adminUserName,
      surveysubject: onderwerp,
      surveytemplate: selectedTemplate,
      surveyquestionlist: JSON.stringify(questionlist),
      answers: "",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/api/v1/survey/create", requestOptions)
      .then((response) => response.text())
      .then(() => navigate("/surveybuildercomplete", { state: { guid: guid } }))
      .catch((error) => console.log("error", error));
  };

  const handleMaximumResponseCount = (event) => {
    setShowMaximumResponses(event);
    setMaximumResponses(0);
  };

  // We make the form with the Trello library that enables drag and drop.
  return (
    <div className="container mx-auto ">
      <FadeIn>
        <div className="flex justify-evenly mb-20">
          <div className="w-full text-center border-2 max-w-[600px] bg-white shadow-md rounded-lg">
            <img src={logo} className="h-14 mx-auto m-2" />
            <h2 className="text-2xl break-words mx-4">{onderwerp}</h2>
            <form>
              <div className="p-10">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="question">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {questionlist.map(
                          ({ id, questiontype, question, required }, index) => {
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
          <div className="w-full border-2 h-[1100px] max-w-[600px] shadow-md bg-white rounded-lg">
            <FadeIn>
              <h2 className="text-center text-2xl font-medium mt-2">
                Instellingen Vragenlijst
              </h2>
              <div className="p-5">
                <ThemeProvider theme={buttontheme}>
                  <div className="border-2 p-5 rounded-md bg-white shadow-md">
                    <h2 className="font-medium text-lg mb-2">Onderwerp</h2>
                    <TextField
                      id="onderwerp"
                      label="Onderwerp"
                      variant="outlined"
                      onChange={(event) => setOnderwerp(event.target.value)}
                    />
                  </div>
                  <div className="border-2 p-5 mt-4 rounded-md bg-white shadow-md">
                    <FormControlLabel
                      onChange={(event) =>
                        setSurveyActive(event.target.checked)
                      }
                      control={<Switch />}
                      checked={surveyActive === true ? true : false}
                      label="Vragenlijst actief"
                    />
                    <br />
                    <FormControlLabel
                      onChange={(event) =>
                        setUserRequired(event.target.checked)
                      }
                      control={<Switch />}
                      checked={userRequired === true ? true : false}
                      label="Gebruiker moet inloggen"
                    />
                    <br />
                    {/* <FormControlLabel
                      control={<Switch />}
                      onChange={(event) =>
                        handleMaximumResponseCount(event.target.checked)
                      }
                      checked={showMaximumResponses === true ? true : false}
                      label="Maximum aantal antwoorden"
                    />
                    <br /> */}
                    {showMaximumResponses === true && (
                      <FadeIn>
                        <TextField
                          type={"number"}
                          variant="outlined"
                          placeholder="Aantal antwoorden"
                          onChange={(event) =>
                            setMaximumResponses(event.target.value)
                          }
                        />
                      </FadeIn>
                    )}
                  </div>
                  <br />
                  {adminTemplates.length > 0 && (
                    <div>
                      <div className="p-5 border-2 rounded-lg">
                        <h2 className="font-medium text-lg mb-2">
                          Template gebruiken
                        </h2>
                        <FormControl fullWidth>
                          <InputLabel>Template</InputLabel>
                          <Select
                            label="Template"
                            value={selectedTemplate}
                            onChange={(event) => handleTemplateChange(event)}
                          >
                            {adminTemplates.map((template, index) => (
                              <MenuItem
                                value={template.templatename}
                                key={index}
                              >
                                {template.templatename}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <br />
                    </div>
                  )}
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
                  <br />
                  <form className="mt-4 border-2 p-5 rounded-md bg-white shadow-md">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={(event) => createForm(event)}
                    >
                      <CheckIcon /> Maak vragenlijst
                    </Button>
                  </form>
                </ThemeProvider>
              </div>
            </FadeIn>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default Builder;
