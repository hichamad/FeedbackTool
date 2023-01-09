import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { QuestionListContext } from "../../context/Context";
import { ThemeProvider } from "@emotion/react";
import { buttontheme } from "../../themes/ButtonTheme";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

function RatingQuestion({ questionname, id }) {
  const { questionlist, updateQuestionlist } = useContext(QuestionListContext);
  const [open, setOpen] = useState(false);
  const [questionName, setQuestionName] = useState(questionname);

  // We delete the question by filtering the questionlist and setting the new questionlist
  const deleteQuestion = () => {
    updateQuestionlist(questionlist.filter((question) => question.id !== id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // We update the question with checking the id and if it matches with the id of the question we want to update the question.
  const updateRatingQuestion = () => {
    updateQuestionlist(
      questionlist.map((question) => {
        if (question.id === id) {
          question.question = questionName;
        }
        return question;
      })
    );
    setOpen(false);
  };

  return (
    <div className="w-full rounded-md border-2 p-5 my-2 bg-white shadow-lg">
      <div className="items-center">
        <div className="mb-2">
          <p className="text-lg font-medium break-words">{questionname}</p>
        </div>
        <div>
          <Rating
            onChange={(e) => console.log(e.target.value)}
            name="size-large"
            size="large"
            precision={0.5}
            disabled
          />
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
            <DialogTitle>Update Rating Vraag</DialogTitle>
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
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                Annuleer
              </Button>
              <Button
                variant="contained"
                onClick={updateRatingQuestion}
                color="success"
              >
                <CreateIcon /> Update Open Vraag
              </Button>
            </DialogActions>
          </ThemeProvider>
        </Dialog>
      </div>
    </div>
  );
}

export default RatingQuestion;
