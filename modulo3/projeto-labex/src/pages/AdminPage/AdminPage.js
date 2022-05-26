import React from "react";
import Header from '../../components/Header/Header'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { goToHomePage } from "../../routes/coordinator";
import { deleteTrip } from "../../services/requests";
import { useRequestData } from "../../hooks/useRequestData";
import { TripCard } from "../../components/TripCard/TripCard";

const AdminPage = () => {
    
    const navigate = useNavigate();
    const [tripsData, getTripsData] = useRequestData('trips', {})
    
    useEffect (() => {
        if(!localStorage.getItem('token')){
            goToHomePage(navigate)
        }
    }, [])

    //Não entendi como usa o history.push, ler melhor

    const removeTrip = (tripId) => {
        if (window.confirm(`Do you really want to delete the trip?`)) {
            deleteTrip(tripId, getTripsData); 
        };
    };

    const tripsList = tripsData.trips ? tripsData.trips.map((trip) => {
        return (
            <TripCard
                key={trip.id}
                trip={trip}
                removeTrip={removeTrip}
            />
        );
    }) : (<p>Carregando...</p>)


    return (
        <>
        <Header/>
        <hr/>
        <main>
            <div>
                <h2>Create new trip</h2>
            </div>
            <hr/>
            <div>
                <h2>Trips List</h2>
                {tripsList}
            </div>
        </main>

        </>
    )
}

export default AdminPage;