import axios from "axios";
import React, { useEffect, useState } from "react";
import { initUrl } from "../service/auth";
import HealthRecordForm from "./healthRecod";
import Moddle from "./moddle";
import swal from "sweetalert";

export default function Prescription() {
    const [appointmentID, setAppointmentID] = useState();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        console.log(appointmentID);
    }, [appointmentID])

/**************************** Toggles value of appointmentId to true when we have a valid visit **********************/
    const handleSubmit = async (event) => {
        console.log(appointmentID);
        try {
            const response = await axios.get("/visit", {appointmentID});
            if(response.data.status === "successfull"){
                console.log(response.data.data);
                setVerified(true);
            }
        } catch (error) {
            setVerified(true);
            swal({
                title: "Invalid visit ID",
                text: "Failed to verify visit, try again with correct visit id!!!"+ error,
                icon: "error",
                button: "Okay",
              });
        }
    };
/**********************************************************************************************************************/
    return (

        <div>
            <div className="container-sm bg bg-white shadow-sm p-3" style={{justifyContent: "center"}}>
                <div className="input-group mb-3" style={{maxWidth: "auto"}}>
                    <input type="text" className="form-control" placeholder="Visit Id..."
                        aria-label="Recipient's username" aria-describedby="basic-addon2" value={appointmentID} onChange={(e) => setAppointmentID(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary mx-3" type="button" onClick={handleSubmit}>Validate</button>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "45px", jus: "start"}}>
                {(verified) && <div> <HealthRecordForm /></div>}
            </div>
            <Moddle/>
        </div>
    );
}