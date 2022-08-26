import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";

// import {StudyInformation} from "./pages/StudyInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path='/' element={<SurveyLayout/>}> */}
        {/*  <Route index element={<StudyInformation />} /> */}
        {/*  <Route path='/study_information' element={<StudyInformation />} /> */}
        {/*  <Route path='/questions' element={<StudyInformation />} /> */}
        {/*  <Route path='/schedule_configuration' element={<StudyInformation />} /> */}
        {/*  <Route path='/sensor_data' element={<StudyInformation />} /> */}
        {/*  <Route path='/overview' element={<StudyInformation />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
