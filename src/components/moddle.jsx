import React, { useRef } from 'react';
import ConsentCheckbox from './ConsentCheckbox';
import { useState } from 'react';

const Moddle = (props) => {

  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dataDeleteDate, setDataDeleteDate] = useState();

  const handleSubmitConsentRequest = async (event) => {
    const eventSource = new EventSource("/create-consent-request?purpose=" + purpose + "&dateFrom=" + startDate + "&dateTo=" + endDate + "&dateEraseAt=" + dataDeleteDate + "&patientId=" + props.patientId + "&doctorId=" + props.doctorId + "&visitId=" + props.visitId +"&hiTypes=%22OPConsultation%22,%22Prescription%22,%22DischargeSummary%22,%22DiagnosticReport%22,%22ImmunizationRecord%22,%22HealthDocumentRecord%22,%22WellnessRecord%22");
    
    eventSource.addEventListener("consent-request-on-init", (event) => {
      eventSource.close();
      console.log(event.data);
      var response = JSON.parse(event.data);
      if (response.status === "successfull") {
        alert("Consent Request sent successfully");
        console.log(response.data);
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

  return (
    <>
      <button type="button" className="btn btn-info" data-bs-toggle="modal"
        style={{ width: "200px" }} data-bs-target="#exampleModal">
        Initiate Consent
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ background: "chocolate" }}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">Consent Initiation in Process</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ background: "#FFE5B4", color: "black" }}>
              <form style={{ display: "float" }}>
                <div className="mb-3">
                  <label for="purpose" className="form-label">Purpose</label>
                  <input type="text" className="form-control" id="purpose"
                    onChange={event => setPurpose(event.target.value)} />

                  <label for="startDate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" id="startDate"
                    onChange={event => setStartDate(event.target.value)} />

                  <label for="endDate" className="form-label">End Date</label>
                  <input type="date" className="form-control" id="endDate"
                    onChange={event => setEndDate(event.target.value)} />

                  <label for="endDate" className="form-label">Data Delete Date</label>
                  <input type="date" className="form-control" id="endDate"
                    onChange={event => setDataDeleteDate(event.target.value)} />
                  <br />
                  <ConsentCheckbox />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ background: "#FFE5B4" }}>
              <button type="button" id="closemodal" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitConsentRequest} >Initiate</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moddle