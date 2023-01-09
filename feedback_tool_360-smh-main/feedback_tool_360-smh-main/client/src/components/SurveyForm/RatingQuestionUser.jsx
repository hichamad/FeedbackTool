import React, { useContext} from "react";
import Rating from "@mui/material/Rating";
import { QuestionAnswerListContext } from "../../context/Context";
function RatingQuestionUser({
  questionid,
  vraag,
  useremail,
  usercompletename,
}) {
  const { questionAnswerList, setQuestionAnswerList } = useContext(
    QuestionAnswerListContext
  );
// Check if the id matches the question id, then add the answers to that specific question is the questionAnswerList.
  const setQuestionAnswer = (event) => {
    console.log(usercompletename);
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
    <div className="w-full rounded-md border-2 p-5 my-2 bg-white">
      <div className="items-center">
        <div className="mb-2">
          <p className="text-lg font-medium">{vraag}</p>
        </div>
        <div>
          <Rating
            onChange={(event) => setQuestionAnswer(event.target.value)}
            name="size-large"
            size={"large"}
          />
        </div>
      </div>
    </div>
  );
}

export default RatingQuestionUser;
