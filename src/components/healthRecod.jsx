import React, { useState } from "react";
//import '../Stylesheets/HealthRecordForm.css'
// import healthRecordService from '../Services/HealthRecordService'
import swal from "sweetalert";
import axios from "axios";

const contStyle = {
  marginBottom: "3rem", 
  background: "lightgrey", 
  padding: "2rem 2rem",
  //textAlign: "left",
  boxShadow: "5px 5px 5px gray",
  border: "solid",
  padding: "3rem 2rem",
  marginTop: "5rem",
  borderRadius: "10px",
};


const HealthRecordForm = (props) => {

  const visitId = props.visitId;
  const doctorId = props.doctorId;

  const [diagnosis, setDiagnosis] = useState('');
  const [dosage, setDosage] = useState('');
  const [medicine, setMedicine] = useState('');
  const [gender, setGender] = useState(props.sex);
  const [age, setAge] = useState(props.Age);
  const [patientName, setPatientName] = useState(props.name);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.patch("/update-visit", { 
      "visitId": visitId, 
      doctorId: localStorage.getItem("id"), 
      "prescription": medicine,
      "dosageInstruction": dosage,
      diagnosis });
    try {
      if (response.data.data.status === "successfull") {
        swal({
          title: "Operation Successfull",
          text: "Record Added Successfully!",
          icon: "success",
          button: "Okay",
        })
      }
    } catch (error) {

    }
    console.log(event);
  };

  return (
    <div className>
      <div>
        <div className="container" style={contStyle}>
          {/* col-6 offset-md-5 */}
          <form>
            <legend>Enter Details</legend>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group" >
                <label htmlFor="patientName">Patient Name </label>
                <input type="text" className="form-control" id="patName" value={props.name} disabled />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input type="text" className="form-control" id="gender" value={props.sex} disabled />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="text" className="form-control" id="age" value={props.Age} disabled />
              </div>
            </div>
            <div style={{ display: "flex"}}>
              <div className="form-group">
                <label htmlFor="diagnosis">Diagnosis</label>
                <input type="text" className="form-control" id="diagnosis"
                  disabled={props.isDisabled}
                  value= {props.diagnosis}
                  onChange={event => setDiagnosis(event.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group">
                <label htmlFor="medicine">Medicine</label>
                <input type="text" className="form-control" id="medicine"
                  value = {props.medicine}
                  disabled={props.isDisabled}
                  onChange={event => setMedicine(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="dosage">Dosage</label>
                <input type="text" className="form-control" id="dosage"
                  value={props.dosage}
                  disabled={props.isDisabled}
                  onChange={event => setDosage(event.target.value)} />
              </div>
            </div>

            <button disabled={props.isDisabled} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HealthRecordForm;