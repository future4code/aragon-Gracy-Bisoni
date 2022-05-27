import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestData } from "../../hooks/useRequestData";
import { goToAdminPage, goToHomePage } from "../../routes/coordinator";
import { decideCandidate } from "../../services/requests";

export const TripDetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [details, getTripsDetail] = useRequestData(`trip/${params.tripId}`, {})

    useEffect(() => {
        if(!localStorage.getItem('token')){
            goToHomePage(navigate)
        }
    }, [])

    const decide = (candidateId, decision) => {
        decideCandidate(params.tripId, candidateId, decision, getTripsDetail);
    };

    const candidatesList = details.trip && details.trip.candidates.map((candidate) => {
        return (
            <div key={candidate.id}>
                <span><b>Name:</b> {candidate.name} - </span>
                <span><b>Profession:</b> {candidate.profession} - </span>
                <span><b>Age:</b> {candidate.age} - </span>
                <span><b>Country:</b> {candidate.country} - </span>
                <span><b>Application Text:</b> {candidate.applicationText} </span>
                <button onClick={() => decide(candidate.id, true)}>Approve</button>
                <button onClick={() => decide(candidate.id, false)}>Reject</button>
                <hr/>
            </div>
        )
    });

    const approvedList = details.trip && details.trip.approved.map((traveler) => {
        return <li key={traveler.id}>{traveler.name}</li>
    })

    return (
        <>
            <button onClick={() => goToAdminPage(navigate)}>Close Details</button>
            <h1>Trip: {details.trip && details.trip.name}</h1>
            <hr />
            <h3>Candidates List:</h3>
            {candidatesList}
            <hr />
            <h3>Approved List:</h3>
            {approvedList}
        </>
    );
}