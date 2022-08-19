import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Main} from "./pages/Main";
import {StudyInformation} from "./pages/StudyInformation";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      {/*<Route path="/" element={<Main/>} />*/}
      <Route path="/" element={<Sidebar/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
