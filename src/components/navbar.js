import React, { useEffect } from "react";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
// import "./nav.css";

import NotLoggedIn from "../service/notLoggedIn";
import { isloggedIn } from "../service/auth";

export default function Navbar() {
  
  const functionToLogout = () => {
    localStorage.clear();
    <NotLoggedIn/>
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ padding: "1.1rem", color: "white" }}
    >
      <a className="navbar-brand" href="/" style={{ fontSize: "2rem" }}>
        Hospital
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{justifyContent: "end"}}>
        <div className="navbar-nav" style={{}}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              {(isloggedIn ) && <a className="nav-link" href="/" onClick={functionToLogout}>
                Logout
              </a>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}