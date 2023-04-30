import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initUrl, isDoctor } from "../service/auth";

export default function Login() {
  const cardStyle = {
    textAlign: "left",
    boxShadow: "5px 5px 5px gray",
    border: "solid",
    padding: "1rem",
    marginTop: "2rem",
    borderRadius: "10px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(isDoctor()){
        navigate("/doctor/home");
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log({ email, password });
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res);
      if (res.data.status === "unsuccessfull") {
        alert(res.data.msg);
        throw res.data.msg;
      }
      console.log(res.data);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("type", res.data.type);
      if (res.data.type === "doctor") {
        navigate("/doctor/home");
      } else if (res.data.type === "admin") {
        navigate("/admin/home");
      } else if (res.data.type === "frontdesk") {
        navigate("/frontdesk/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container col-md-3" style={cardStyle}>
      <form onSubmit={handleLogin}>
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-dark"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          Login
        </button>
        {/* <a href="#" class="forgot-password-link" style={{display:"block"}}>
          Forgot password?
        </a> */}
      </form>
    </div>
  );
}
