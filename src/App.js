import logo from "./logo.svg";
import "./App.css";
import {  BrowserRouter as Router,  Routes,  Switch,  Route,  Link } from "react-router-dom";
import Login from "./components/login";
import DoctorHome from "./components/doctorHome";
import AdminHome from "./components/adminHome";
import FrontdeskHome from "./components/frontdeskHome";
import Navbarbase from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbarbase />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/frontdesk/home" element={<FrontdeskHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;   
