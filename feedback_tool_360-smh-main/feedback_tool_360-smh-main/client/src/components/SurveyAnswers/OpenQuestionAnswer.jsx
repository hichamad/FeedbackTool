import React from "react";
import TextField from "@mui/material/TextField";
import "../../assets/css/avoidbreaking.css";

function OpenQuestionAnswer({ vraag, required, answer }) {
  return (
    <div
      className="w-full rounded-md border-2 p-5 my-2 bg-white break-inside-avoid"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="items-center break-inside-avoid">
        <div id="stopbreaking" className="mb-4 ">
          <p id="stopbreaking" className="text-lg font-medium text-center">
            {vraag}
          </p>
        </div>
        <div>
          <TextField
            disabled
            id="stopbreaking"
            multiline
            required={required}
            fullWidth
            rows={4}
            style={{ width: "100%" }}
            inputProps={{ maxLength: 250 }}
            value={answer ? answer : "n/a"}
          />
        </div>
      </div>
    </div>
  );
}

export default OpenQuestionAnswer;
