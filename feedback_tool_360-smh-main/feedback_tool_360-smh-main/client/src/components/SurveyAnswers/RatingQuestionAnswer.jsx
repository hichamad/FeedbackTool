import React from "react";
import Rating from "@mui/material/Rating";
import "../../assets/css/avoidbreaking.css";

function RatingQuestionAnswer({ vraag, answer }) {
  return (
    <div
      className="w-full rounded-md border-2  p-5 my-2 bg-white break-inside-avoid"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="items-center break-inside-avoid">
        <div id="stopbreaking" className="mb-4">
          <p id="stopbreaking" className="text-lg font-medium text-center">
            {vraag}
          </p>
        </div>
        <div id="stopbreaking" className="flex justify-center">
          <Rating
            id="stopbreaking"
            disabled
            name="size-large"
            size="large"
            precision={0.5}
            value={parseInt(answer)}
          />
        </div>
      </div>
    </div>
  );
}

export default RatingQuestionAnswer;
