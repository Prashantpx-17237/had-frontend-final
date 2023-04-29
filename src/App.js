import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import {  BrowserRouter as Router,  Routes,  Switch,  Route,  Link } from "react-router-dom";
import Login from "./components/login";
import DoctorHome from "./components/doctorHome";
import AdminHome from "./components/adminHome";
import FrontdeskHome from "./components/frontdeskHome";

function App() {
  return (
    <div className="App">
      <Navbar />
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
