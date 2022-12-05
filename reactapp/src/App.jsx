import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import SurveyLayout from "./layout/SurveyLayout";
import StudyInformation from "./pages/StudyInformation";
import StudyQuestions from "./pages/StudyQuestions";
import Overview from "./pages/Overview";
import ScheduleConfiguration from "./pages/ScheduleConfiguration";
import SensorData from "./pages/SensorData";
import Upload from "./pages/Upload";
import CustomizedDialog from "./components/Dialog/CustomizedDialog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/study" element={<SurveyLayout />}>
          <Route index element={<StudyInformation />} />
          <Route
            path="/study/study_information"
            element={<StudyInformation />}
          />
          <Route path="/study/questions" element={<StudyQuestions />} />
          <Route
            path="/study/schedule_configuration"
            element={<ScheduleConfiguration />}
          />
          <Route path="/study/sensor_data" element={<SensorData />} />
          <Route path="/study/overview" element={<Overview />} />
        </Route>
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <CustomizedDialog />
    </BrowserRouter>
  );
}

export default App;
