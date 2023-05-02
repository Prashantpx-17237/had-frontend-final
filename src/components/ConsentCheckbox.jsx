import React, { useState } from 'react'


const ConsentCheckbox = (props) => {

    return (
        <div>
            <div className="form-check" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div>
                    <label className="form-check-label" for="flexCheckDefault">
                        OPConsultation
                    </label>
                    <input className="form-check-input" type="checkbox" value="OPConsultation" id="flexCheckDefault" />
                </div>

                <div>
                    <label className="form-check-label" for="flexCheckDefault2">
                        Prescription
                    </label>
                    <input className="form-check-input" type="checkbox" value="Prescription" id="flexCheckDefault2" />
                </div>
            </div>

            <div className="form-check" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>

                <div>
                    <label className="form-check-label" for="flexCheckDefault3">
                        DischargeSummary
                    </label>
                    <input className="form-check-input" type="checkbox" value="DischargeSummary" id="flexCheckDefault3" />
                </div>

                <div>
                    <label className="form-check-label" for="flexCheckDefault4">
                        DiagnosticReport
                    </label>
                    <input className="form-check-input" type="checkbox" value="DiagnosticReport" id="flexCheckDefault4" />
                </div>

            </div>

            <div className="form-check" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>

                <div>
                    <label className="form-check-label" for="flexCheckDefault5">
                        ImmunizationRecord
                    </label>
                    <input className="form-check-input" type="checkbox" value="ImmunizationRecord" id="flexCheckDefault5" />
                </div>

                <div>
                    <label className="form-check-label" for="flexCheckDefault6">
                        HealthDocumentRecord
                    </label>
                    <input className="form-check-input" type="checkbox" value="HealthDocumentRecord" id="flexCheckDefault6" />
                </div>

            </div>
        </div>
    )
}

export default ConsentCheckbox