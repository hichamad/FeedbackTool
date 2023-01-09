import React from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

function SurveyComplete() {
  return (
    <FadeIn>
      <div className="p-10">
        <h2 className="text-3xl font-medium">De vragenlijst is verstuurd!</h2>
        <p className="text-lg mt-4">
          Bedankt voor het invullen en nog een fijne dag toegewenst!
        </p>
      </div>
    </FadeIn>
  );
}

export default SurveyComplete;
