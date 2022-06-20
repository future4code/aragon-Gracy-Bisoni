import React from "react";
import { useNavigate } from "react-router-dom";
import { goToTripDetails } from "../../routes/coordinator";

export const TripCard = (props) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const {id, name, description, planet, durationInDays, date} = props.trip;

    return (
        <>
            <p><b>Name:</b> {name}</p>
            <p><b>Description:</b> {description}</p>
            <p><b>Planet:</b> {planet}</p>
            <p><b>Duration:</b> {durationInDays} days</p>
            <p><b>Date:</b> {date}</p>

            {token && (
                <>
                    <button onClick={()=> goToTripDetails(navigate, id)}>See details</button>
                    <button onClick={() => props.removeTrip(id)}>Delete Trip</button>
                </>
            )}
            <hr />
        </>
    )
}