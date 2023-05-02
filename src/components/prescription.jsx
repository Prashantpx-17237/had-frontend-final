import axios from "axios";
import React, { useEffect, useState } from "react";
import { initUrl } from "../service/auth";
import HealthRecordForm from "./healthRecod";
import Moddle from "./moddle";
import swal from "sweetalert";
import ConsentHistory from "./consentHistory";

export default function Prescription() {
    const [appointmentID, setAppointmentID] = useState();
    const [verified, setVerified] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        console.log(appointmentID);
    }, [appointmentID])

    /**************************** Toggles value of appointmentId to true when we have a valid visit **********************/
    const handleSubmit = async (event) => {
        console.log(appointmentID);
        try {
            const response = await axios.get("/visit", { appointmentID });
            if (response.data.data.status === "successfull") {
                console.log(response.data.data);
                patientName = setPatientName(response.data.patientName);
                gender = setGender(response.data.gender);
                age = setAge(response.data.age);
                setVerified(true);

            }
        } catch (error) {
            setVerified(true);
            swal({
                title: "Invalid visit ID",
                text: "Failed to verify visit, try again with correct visit id!!!" + error,
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
                        value={appointmentID} onChange={(e) => setAppointmentID(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary mx-3" type="button" onClick={handleSubmit}>Validate</button>
                    </div>
                </div>
            </div>
            {(verified) && <div>
                <div> <HealthRecordForm visitId={appointmentID}
                    doctorId={localStorage.getItem('doctorId')} name={patientName} sex={gender} Age={age} /></div>
                <div className="row">
                    <div className="col">
                        <Moddle />
                    </div>
                    <div className="col">
                        <ConsentHistory />
                    </div>
                </div>
            </div>}
        </div>
    );
}