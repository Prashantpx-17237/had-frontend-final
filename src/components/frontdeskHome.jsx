import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { initUrl } from "../service/auth";
import FrontDeskList from "./frontdeskList";
import { throwStatement } from "@babel/types";

export default function FrontdeskHome() {
    const [id,setId]= useState("");
    const [otp,setOtp]=useState("");
    const [patList,setPatList]=useState([]);
    const [otpBtnDisabled, setotpBtnDisabled]= useState("true");
    const [txnId, setTxnId]= useState("");
    const [patientData, setPatientData] = useState(null);

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
          const eventSource = new EventSource("/generate-otp?abhaId=" + id);

          eventSource.addEventListener("on-init", (event) => {
            console.log(event.data);
            var response = JSON.parse(event.data);
            if (response.status === "successfull") {
              alert("OTP sent successfullt");
              console.log(response.data);
              console.log(response.data.transactionId);
              setTxnId(response.data.transactionId);
              setotpBtnDisabled(false)
              eventSource.close();
            }
            else {
              if (response.data.msg !== null) {
                alert(response.data.msg);
              }
              else {
                alert("Error occured please try again later");
              }
              eventSource.close();
            }
          });
        }
        catch(error) {
          console.log(error)
        }
    }

    const handleOtp = async(e)=>{
      e.preventDefault();
      try {
        const eventSource = new EventSource("/confirm-otp?transactionId=" + id + "&otp=" + otp);

        eventSource.addEventListener("on-confirm", (event) => {
          console.log(event.data);
          var response = JSON.parse(event.data);
          if (response.status === "successfull") {
            
            console.log(response.data);
            console.log(response.data.transactionId);
            setTxnId(response.data.transactionId);
            setotpBtnDisabled(false)
            eventSource.close();
          }
          else {
            if (response.data.msg !== null) {
              alert(response.data.msg);
            }
            else {
              alert("Error occured please try again later");
            }
            eventSource.close();
          }
        });
      }
      catch(error) {
        console.log(error)
      }
    }

    const createVisit = async(e)=> {

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
                disabled={otpBtnDisabled!=="true"}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter ABHA ID"
                onChange={(e)=>setId(e.target.value)}
              />
            </div>
            <button disabled={otpBtnDisabled!=="true"} className="btn btn-success" style={{marginTop:"1rem",width:"100%"}}>Submit</button>
          </form>
        </div>
        <div className="col-md-3">
        <form style={formStyle} onSubmit={handleOtp}>
            <div class="form-group">
              <label hidden={otpBtnDisabled==="true"} for="exampleInputEmail1">Enter Otp</label>
              <input
                hidden={otpBtnDisabled==="true"} 
                type="text"
                class="form-control"
                id="exampleInputEmail12"
                aria-describedby="emailHelp"
                placeholder="Enter Otp"
                onChange={(e)=>setOtp(e.target.value)}
              />
            </div>
            <button hidden={otpBtnDisabled==="true"} className="btn btn-success" style={{marginTop:"1rem",width:"100%"}}>Submit</button>
          </form>
        </div>
      </div>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div className="col-md-6">
          <form hidden={patientData === null} style={formStyle} onSubmit={createVisit}>
              <div class="form-group">
                <label hidden={otpBtnDisabled!=="true"} for="exampleInputEmail1">Pateint Details</label>
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
                >
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="Gender"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="DOB"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="Mobile"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="ABHAId"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="checkName"
                    aria-describedby="emailHelp"
                    placeholder="Address"
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  </div>
                  <div>
                    <button className="btn btn-success" style={{marginTop:"1rem",width:"100%"}}>Create Visit</button>
                  </div>                
                </div>
              </div>
            </form>
        </div>      
      </div>
      <FrontDeskList patList={patList}/>
    </div>
  );
}
