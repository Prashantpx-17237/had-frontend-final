import React from "react";
import Consent from "./Consent";

const ConsentRequest = ({ request }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <h3>{request.id}</h3>
                </div>
                <div className="col">
                    <h3>{request.status}</h3>
                </div>
            </div>
            {request.status === "GRANTED" && request.consent.map(consent => {
                return (
                    <Consent
                        consent={consent} />
                )
            })}
        </>
    )
}

export default ConsentRequest;