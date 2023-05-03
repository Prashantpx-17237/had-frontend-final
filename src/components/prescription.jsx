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

    useEffect(() => {
        console.log(visitId);
    }, [visitId])

    const handleReset = (event) => {
        setVisitsData(null);
    }

    /**************************** Toggles value of appointmentId to true when we have a valid visit **********************/
    const handleSubmit = async (event) => {
        console.log(visitId);
        try {
            const res = await axios.post("/visit", {
                "visitId": visitId,
                "doctorId": "1"
            });
            console.log(res);
            if (res.data.status === "successfull") {
                alert(res.data.msg);
                patientName = setPatientName(res.data.patientName);
                gender = setGender(res.data.gender);
                age = setAge(res.data.age);
                setVerified(true)
                setVisitsData(res.data.data.consentRequests)
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
                    doctorId={localStorage.getItem('doctorId')} name={patientName} sex={gender} Age={age} /></div>
                <div className="row">
                    <div className="col">
                        <Moddle />
                    </div>
                    <div className="col">
                        <ConsentHistory />
                    </div>
                </div>
                <div style={{ marginTop: "45px", jus: "start" }}>
                    {(verified) && <div> <HealthRecordForm /></div>}
                </div>
                <div className="row">
                    <div className="col">
                        {(visitsData !== null) && <Moddle />}
                    </div>
                    {/* <div>
                    {(visitsData !== null) &&  <ConsentHistory data={visitsData} />}
                </div> */}
                </div>
                <div style={{ pos: 0 }}>
                    {(visitsData !== null) && <ReactJsonPrint dataObject={{ visitsData }} />}
                </div>
            </div>}
        </div>
    );
}