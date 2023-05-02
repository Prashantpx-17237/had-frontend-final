import React, { useRef } from 'react';
import ConsentCheckbox from './ConsentCheckbox';

const Moddle = () => {


  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                  <input type="text" className="form-control" id="purpose" />

                  <label for="startDate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" id="startDate" placeholder="Enter Start Date" />

                  <label for="endDate" className="form-label">End Date</label>
                  <input type="date" className="form-control" id="endDate" />

                  <label for="endDate" className="form-label">Data Delete Date</label>
                  <input type="date" className="form-control" id="endDate" />
                  <br/>
                  <ConsentCheckbox/>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ background: "#FFE5B4" }}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Initiate</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moddle