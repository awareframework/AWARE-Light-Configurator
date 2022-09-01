import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import SurveyLayout from "./layout/SurveyLayout";
import StudyInformation from "./pages/StudyInformation";
import StudyQuestions from "./pages/StudyQuestions";
import Overview from "./pages/Overview";

// import {StudyInformation} from "./pages/StudyInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/study" element={<SurveyLayout />}>
          <Route index element={<StudyInformation />} />
          <Route
            path="/study/study_information"
            element={<StudyInformation />}
          />
          <Route path="/study/questions" element={<StudyQuestions />} />
          <Route
            path="/study/schedule_configuration"
            element={<StudyInformation />}
          />
          <Route path="/study/sensor_data" element={<StudyInformation />} />
          <Route path="/study/overview" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
