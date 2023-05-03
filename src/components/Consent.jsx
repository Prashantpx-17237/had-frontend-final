import React from "react";

const Consent = ({ consent }) => {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <h3>{consent.id}</h3>
                </div>
                <div className="col">
                    <h3>{consent.status}</h3>
                </div>
            </div>
            {consent.status === "RECEIVED" && consent.careContext && consent.careContext.map(careContext => {
                return (
                    <div className="row">
                    <div className="col">{careContext.diagnosis}</div>
                    <div className="col">{careContext.prescription}</div>
                    <div className="col">{careContext.dosageInstruction}</div>
                </div>
                )    
            })}
        </div>
    )
}

export default Consent;