import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import { useContext } from "react";
import { QuestionListContext } from "../../context/Context";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

function OpenQuestion({ questionname, id, required }) {
  const { questionlist, updateQuestionlist } = useContext(QuestionListContext);
  const [open, setOpen] = useState(false);
  const [checkboxRequired, setCheckboxRequired] = useState(required);
  const [questionName, setQuestionName] = useState(questionname);

  // We delete the question by filtering the questionlist and setting the new questionlist
  const deleteQuestion = () => {
    updateQuestionlist(questionlist.filter((question) => question.id !== id));
    console.log(questionlist);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log(required);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckboxRequired(required);
  };

  // We update the question with checking the id and if it matches with the id of the question we want to update the question.
  const updateOpenQuestion = () => {
    console.log(questionName, checkboxRequired);
    updateQuestionlist(
      questionlist.map((question) => {
        if (question.id === id) {
          question.question = questionName;
          question.required = checkboxRequired;
        }
        return question;
      })
    );
    setOpen(false);
  };

  return (
    <div className="w-full rounded-md border-2 p-5 my-2 bg-white shadow-lg">
      <div className="items-center">
        <div className="mb-2 ">
          <p className="text-lg font-medium break-words">{questionname}</p>
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            multiline
            required={required}
            placeholder={required ? "Dit veld is verplicht" : ""}
            disabled
            fullWidth
            rows={4}
            style={{ width: "100%" }}
            inputProps={{ maxLength: 250 }}
          />
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <ThemeProvider theme={buttontheme}>
          <Button onClick={handleClickOpen} variant="contained">
            <CreateIcon /> Update Vraag
          </Button>
          <Button onClick={deleteQuestion} variant="contained" color="error">
            <DeleteIcon /> Verwijder Vraag
          </Button>
        </ThemeProvider>
      </div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <ThemeProvider theme={buttontheme}>
          <DialogTitle>Update Open Vraag</DialogTitle>
          <DialogContent>
            <div className="items-center">
              <div className="mb-2 ">
                <p>Vraag:</p>
                <TextField
                  id="outlined-multiline-static"
                  onChange={(event) => setQuestionName(event.target.value)}
                  defaultValue={questionname}
                  fullWidth
                  style={{ width: "100%" }}
                  inputProps={{ maxLength: 250 }}
                />
                <FormControlLabel
                  onChange={(event) =>
                    setCheckboxRequired(event.target.checked)
                  }
                  control={<Checkbox checked={checkboxRequired} />}
                  label="Verplicht"
                  inputprops={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Annuleer
            </Button>
            <Button
              variant="contained"
              onClick={updateOpenQuestion}
              color="success"
            >
              <CreateIcon /> Update Open Vraag
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}

export default OpenQuestion;
