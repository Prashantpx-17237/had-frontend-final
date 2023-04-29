import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { initUrl } from "../service/auth";
import FrontDeskList from "./frontdeskList";

export default function FrontdeskHome() {
    const [id,setId]= useState("");
    const [otp,setOtp]=useState("");
    const [patList,setPatList]=useState([]);

    useEffect(()=>{
        console.log(patList);
    })
    const addItemToList = (item) => {
        setPatList([...patList, item]);
        // console.log(patList);
    };
    const handleAbhaId = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(initUrl+"/getpatient",{id});
            // console.log(res.data.data.patient);
            addItemToList(res.data.data.patient);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOtp = async()=>{
        
    }
    const formStyle={padding:"1rem"}
  return (
    <div>
      <h4>FrontDesk</h4>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div className="col-md-3">
          <form style={formStyle} onSubmit={handleAbhaId}>
            <div class="form-group">
              <label for="exampleInputEmail1">Enter ABHA ID</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter ABHA ID"
                onChange={(e)=>setId(e.target.value)}
              />
            </div>
            <button className="btn btn-success" style={{marginTop:"1rem",width:"100%"}}>Submit</button>
          </form>
        </div>
        <div className="col-md-3">
        <form style={formStyle}>
            <div class="form-group">
              <label for="exampleInputEmail1">Enter Otp</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail12"
                aria-describedby="emailHelp"
                placeholder="Enter Otp"
                onChange={(e)=>setOtp(e.target.value)}
              />
            </div>
            <button className="btn btn-success" style={{marginTop:"1rem",width:"100%"}}>Submit</button>
          </form>
        </div>
      </div>
      <FrontDeskList patList={patList}/>
    </div>
  );
}
