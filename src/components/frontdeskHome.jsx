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
    const [showPatientDetails, setShowPatientDetails] = useState(false);

    const [patientName, setPateintName] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [patientAbhaId, setPatientAbhaId] = useState("");
    const [patientMobile, setPatientMobile] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientDOB, setPatientDOB] = useState("");
    const [patientId, setPatientId] = useState("")
    const [patientAccessToekn, setPatientAccessToekn] = useState("")
    const [patientAbhaNumber, setPatientAbhaNumber] = useState("")
    const [visitId, setVisitId] = useState("")

    useEffect(()=>{
        console.log(patList);
    })
    const addItemToList = (item) => {
        setPatList([...patList, item]);
        // console.log(patList);
    };

    const resetPatientDetailsFields = () => {
      setPateintName("");
      setPatientAbhaId("");
      setPatientAccessToekn("");
      setPatientAddress("");
      setPatientDOB("");
      setPatientGender("");
      setPatientId(""); 
    }

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

    const setPatientFields = (patientData, accessToken) => {
      setPateintName(patientData.name);
      setPatientAbhaId(patientData.abha_id);
      setPatientDOB(patientData.age);
      setPatientMobile(patientData.mobile);
      setPatientGender(patientData.gender);
      setPatientAddress(patientData.address);    
      setPatientId(patientData.id)
      setPatientAbhaNumber(patientData.abha_number)
      setPatientAccessToekn(accessToken);
    }

    const handleOtp = async(e)=>{
      e.preventDefault();
      try {
        const eventSource = new EventSource("/confirm-otp?transactionId=" + txnId + "&otp=" + otp);

        eventSource.addEventListener("on-confirm", (event) => {
          setotpBtnDisabled(true)
          eventSource.close();
          console.log(event.data);
          var response = JSON.parse(event.data);
          if (response.status === "successfull") {
            var patientData = response.data.patient;
            setPatientFields(patientData, response.data.accessToken);
            setShowPatientDetails(true);            
          }
          else {
            if (response.msg === undefined) {
              alert(response.data.msg);
            }
            else {
              alert("OTP cannot be confirmed. Please try again later.");
            }
          }
          setId("");
          setOtp("");
        });
      }
      catch(error) {
        console.log(error)
      }
    }

    const createVisit = async(e)=> {
      e.preventDefault();
      try {
        const eventSource = new EventSource("/add-visit?patientId=" + patientId + "&accessToken=" + patientAccessToekn);
        eventSource.addEventListener("on-init", (event) => {
          console.log(event.data);
          eventSource.close();
          var response = JSON.parse(event.data);
          if (response.status === "successfull") {            
            alert("" + response.msg);
            let patientObj = {
              visitId: response.data.id,
              name: patientName,
              gender: patientGender,
              abha_id: patientAbhaId,
              age: patientDOB,
              mobile: patientMobile,
              abha_number: patientAbhaNumber
            }
            resetPatientDetailsFields();
            addItemToList(patientObj);
          }
          else {
            setShowPatientDetails(false);
            setotpBtnDisabled(true)
            if (response.msg !== null) {
              alert(response.msg);
              eventSource.close();
            }
            else {
              alert("Cannot Create Visit. Access Token Expired. Please start authentication again");
              eventSource.close();
            }
            eventSource.close();
          }
          setotpBtnDisabled(true)
          setShowPatientDetails(false);
        });
      }
      catch(error) {
        console.log(error)
      }
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
                value={otp}
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

      {/* 
        Code to show patient Details and create visit of seelcted patient
      */}
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div className="col-md-6">
          <form hidden={showPatientDetails === false} style={formStyle} onSubmit={createVisit}>
              <div class="form-group">
                <label hidden={otpBtnDisabled!=="true"} for="exampleInputEmail1">Patient Details</label>
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
                >
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="patientName"
                    value={patientName}
                    aria-describedby="emailHelp"
                    placeholder="Name"
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    value={patientGender}
                    id="gender"
                    aria-describedby="emailHelp"
                    placeholder="Gender"
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="DOB"
                    value={patientDOB}
                    aria-describedby="emailHelp"
                    placeholder="DOB"
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="mobile"
                    value={patientMobile}
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
                    id="abhaId"
                    value={patientAbhaId}
                    aria-describedby="emailHelp"
                    placeholder="ABHAId"
                  />
                  </div>
                  <div className="col-md-3">
                    <input
                    disabled={true}
                    type="text"
                    class="form-control"
                    id="address"
                    value={patientAddress}
                    aria-describedby="emailHelp"
                    placeholder="Address"
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
