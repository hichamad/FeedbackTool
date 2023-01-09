import React from "react";
import NavBar from "../components/ApplicationWide/NavBar";
import TemplateBuilder from "../components/Template/TemplateBuilder";

// Admin Template Builder Page
function AdminTemplateBuilder() {
  return (
    <div>
      <NavBar />
      <TemplateBuilder />
    </div>
  );
}

export default AdminTemplateBuilder;
