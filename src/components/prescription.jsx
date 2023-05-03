import axios from "axios";
import React, { useEffect, useState } from "react";
import { initUrl } from "../service/auth";
import HealthRecordForm from "./healthRecod";
import Moddle from "./moddle";
import swal from "sweetalert";
import ConsentHistory from "./consentHistory";
import ReactJsonPrint from 'react-json-print'



export default function Prescription() {
    const [visitId, setVisitId] = useState();
    const [verified, setVerified] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [visitsData, setVisitsData] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false)
    const [diagnosis, setDiagnosis] = useState("")
    const [medicine, setMedicine] = useState("")
    const [dosage, setDosage] = useState("")
    const [patientId, setPatientId] = useState("")

    useEffect(() => {
        console.log(visitId);
    }, [visitId])

    const handleReset = (event) => {
        setVisitsData(null);
        setVisitId("")
        setPatientId(null)
        setPatientName(null)
        setGender(null)
        setDiagnosis(null)
        setDosage(null)
        setVerified(false)
    }

    /**************************** Toggles value of appointmentId to true when we have a valid visit **********************/
    const handleSubmit = async (event) => {
        console.log(visitId);
        try {
            const res = await axios.post("/visit", {
                "visitId": visitId,
                "doctorId": localStorage.getItem("id")
            });
            console.log(res);
            if (res.data.status === "successfull") {
                alert(res.data.msg);
                setPatientName(res.data.data.patient.name);
                setGender(res.data.data.patient.gender);
                setAge(res.data.data.patient.age);
                setVerified(true)
                setVisitsData(res.data.data.consentRequests)
                setIsDisabled(res.data.data.visit.isDisabled)
                setDiagnosis(res.data.data.visit.diagnosis)
                setMedicine(res.data.data.visit.prescription)
                setDosage(res.data.data.visit.dosageInstruction)
                setPatientId("" + res.data.data.patient.id)
            }
            else {
                swal({
                    title: "Error occurred",
                    text: res.data.msg,
                    icon: "error",
                    button: "Okay",
                });
            }
        } catch (error) {
            swal({
                title: "Error Occured.",
                text: "Error occured while fetching data. Please try again later." + error,
                icon: "error",
                button: "Okay",
            });
        }
    };
    /**********************************************************************************************************************/
    return (

        <div>
            <div className="container-sm bg bg-white shadow-sm mt-4" style={{ dispaly: "flex" }}>
                <div className="input-group" style={{ maxWidth: "auto" }}>
                    <input type="text" className="form-control" placeholder="Visit Id..."
                        style={{ border: "1px solid chocolate" }}
                        aria-label="Recipient's username" aria-describedby="basic-addon2"
                        value={visitId} onChange={(e) => setVisitId(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary mx-3" type="button" onClick={handleSubmit}>Validate</button>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary mx-3" type="button" onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
            {(verified) && <div>
                <div> <HealthRecordForm visitId={visitId}
                    doctorId={localStorage.getItem('doctorId')} name={patientName} sex={gender} Age={age} isDisabled={isDisabled} dosage={dosage} medicine={medicine} diagnosis={diagnosis}/></div>
                <div className="row">
                    <div className="col">
                        <Moddle 
                        visitId={visitId}
                        doctorId={localStorage.getItem('id')}
                        patientId={patientId}/>
                    </div>
                    <div className="col">
                        <ConsentHistory />
                        {(visitsData !== null) && <ReactJsonPrint dataObject={{ visitsData }} />}
                    </div>
                </div>
            </div>}
        </div>
    );
}