import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Survey from "./routes/Survey";
import SurveyBuilder from "./routes/SurveyBuilder";
import SurveyBuilderComplete from "./routes/SurveyBuilderComplete";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AdminDashBoard from "./routes/AdminDashBoard";
import SurveyAnswers from "./routes/SurveyAnswers";
import SurveyBuilderUpdate from "./routes/SurveyBuilderUpdate";
import AdminTemplateBuilder from "./routes/AdminTemplateBuilder";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./routes/NotFound";

// All of the routes in our application, some are Protected by a Admin signin
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />}>
              <Route path=":surveyid" element={<Survey />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/surveybuilder"
              element={
                <ProtectedRoute>
                  <SurveyBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveybuildercomplete"
              element={
                <ProtectedRoute>
                  <SurveyBuilderComplete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute>
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveyanswers"
              element={
                <ProtectedRoute>
                  <SurveyAnswers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveybuilderupdate"
              element={
                <ProtectedRoute>
                  <SurveyBuilderUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templatebuilder"
              element={
                <ProtectedRoute>
                  <AdminTemplateBuilder />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
