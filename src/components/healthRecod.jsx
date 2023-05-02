import React, { useState } from "react";
import '../Stylesheets/HealthRecordForm.css'
// import healthRecordService from '../Services/HealthRecordService'
import swal from "sweetalert";
const HealthRecordForm = ({ user }) => {
  const [medicines, setMedicines] = useState([]);
  const [dosages, setDosages] = useState([]);
  const [newMedicine, setNewMedicine] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [visitId, setVisitId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [problem, setProblem] = useState('');
  const [treatment, setTreatment] = useState('');
  //console.log(user)

  const handleNewMedicineChange = (event) => {
    setNewMedicine(event.target.value);
  };
  const handleNewDosageChange = (event) => {
    setNewDosage(event.target.value);
  };

  const handleAddMedicine = () => {
    if (newMedicine !== "" && newDosage !== "") {
      setMedicines([...medicines, newMedicine]);
      setNewMedicine("");
      setDosages([...dosages, newDosage]);
      setNewDosage("");
    }
    else {
      swal({
        text: "Enter All Fields To Add this to Prescription!",
        icon: " warning",
        button: "Okay",
      }).then(() => {
        setNewMedicine("");
        setNewDosage("");
      })

    }
  };
  //Backend Service Call...
  const healthRecordHandler = async (healthRecord) => {
    try {
      const response = null//await healthRecordService.addRecord(healthRecord)
      if (response === "PatientIdNotMatched") {
        swal({
          title: "Operation Failed",
          text: "Details Didn't Match !!!,  Contact Admission Branch ",
          icon: "error",
          button: "Okay",
        });
        return;
      }
      if (response > 0) {
        swal({
          title: "Operation Successfull",
          text: "Record Added Successfully! Record Id. : " + response,
          icon: "success",
          button: "Okay",
        }).then(() => {
          window.location.reload(true);
        })

      }
      else {
        swal({
          title: "Operation Failed",
          text: "Details Didn't Match !!!,  Contact Admission Branch ",
          icon: "error",
          button: "Okay",
        }).then(() => {
          window.location.reload(true);
        })

      }
    }
    catch (exception) {
      swal({
        title: "Operation Failed",
        text: "Failed to add record, try again !!!" + exception,
        icon: "error",
        button: "Okay",
      });
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const prescriptions = medicines.map((item, index) => {
      return {
        "medicine": item,
        "dosage": parseInt(dosages[index])
      }
    })


    const healthRecord = {
      "recordDto": {
        "patientId": patientId,
        "doctorId": parseInt(user.doctorId),
        "visitId": parseInt(visitId),
        "problem": problem,
        "treatment": treatment
      },
      "prescriptionDtos": prescriptions
    };
    //console.log(healthRecord); 
    healthRecordHandler(healthRecord);
    setMedicines([]);
    setDosages([]);
    setPatientId('');
    setVisitId('');
    setProblem('');
    setTreatment('');
    setNewMedicine("");
    setNewDosage("");

  };

  return (
    <div className="container -sm" style={{ display: "flex", flexWrap: "wrap", background: "lightgrey"}}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="InputLabel">Patient Id:</label>
            <input type="text" className="InputText" value={patientId} onChange={(e) => { setPatientId(e.target.value) }} required />
          </div>
          <div>
            <label className="InputLabel">Diagnosis:</label>
            <input type="text" className="InputText" value={problem} onChange={(e) => { setProblem(e.target.value) }} required />
          </div>
          <div>
            <label className="InputLabel">Treatment:</label>
            <input type="text" className="InputText" value={treatment} onChange={(e) => { setTreatment(e.target.value) }} required />
          </div>
        </div>
        <br />
        <div>
          <label className="InputLabel">Medicines:</label>
          <div>
            <ol className="MedicineOL">
              {medicines.map((medicine, index) => (
                <li key={index} className='Medicine'><b>Medicine:</b> {medicine}, <b>Dosage:</b> {dosages[index]}</li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <label className="InputLabel">Medicine:</label>
          <input type="text" className="InputText" value={newMedicine} onChange={handleNewMedicineChange} />
        </div>
        <div>
          <label className="InputLabel">Dosage:</label>
          <input type="number" className="InputText" value={newDosage} onChange={handleNewDosageChange} />
        </div>
        <br/>
        <button type="button" onClick={handleAddMedicine} className='btn btn-dark' style={{ margin: "0 10px" }}>
          Add Medicine
        </button>
        <br />
        <button type="submit" className='btn btn-dark' style={{ marginBottom: "10px", marginTop: "10px" }}>Save Health Record</button>
      </form>
    </div>
  );
};

export default HealthRecordForm;