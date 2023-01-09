import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashBoardSurveys from "../components/AdminSystem/AdminDashBoardSurveys.jsx";
import NavBar from "../components/ApplicationWide/NavBar";

// Admin Dashboard Page
function AdminDashBoard() {
  return (
    <div>
      <NavBar />
      <AdminDashBoardSurveys />
    </div>
  );
}

export default AdminDashBoard;
