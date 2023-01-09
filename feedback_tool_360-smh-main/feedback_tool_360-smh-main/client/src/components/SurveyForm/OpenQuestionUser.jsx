import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { QuestionAnswerListContext } from "../../context/Context";

function OpenQuestionUser({
  questionid,
  vraag,
  required,
  useremail,
  usercompletename,
}) {
  const { questionAnswerList, setQuestionAnswerList } = useContext(
    QuestionAnswerListContext
  );

  // Check if the id matches the question id, then add the answers to that specific question is the questionAnswerList.
  const setQuestionAnswer = (event) => {
    for (var i in questionAnswerList) {
      if (questionAnswerList[i].id == questionid) {
        questionAnswerList[i].answer = event;
        questionAnswerList[i].useremail = useremail;
        questionAnswerList[i].usercompletename = usercompletename;
        setQuestionAnswerList(questionAnswerList);
      }
    }
  };

  return (
    <div className="w-full rounded-md border-2  p-5 my-2 bg-white">
      <div className="items-center">
        <div className="mb-2 ">
          <p className="text-lg font-medium">{vraag}</p>
        </div>
        <div>
          <TextField
            id="stopbreaking"
            multiline
            required={required}
            placeholder={required ? "Dit veld is verplicht" : ""}
            fullWidth
            rows={4}
            style={{ width: "100%" }}
            inputProps={{ maxLength: 250 }}
            onChange={(event) => setQuestionAnswer(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default OpenQuestionUser;
