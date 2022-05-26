import React from "react";

export const TripCard = (props) => {
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
                    <button>Exibir detalhes</button>
                    <button onClick={() => props.removeTrip(id)}>Excluir viagem</button>
                </>
            )}
            <hr />
        </>
    )
}