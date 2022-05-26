import React from "react";
import Header from '../../components/Header/Header'
import { useRequestData } from "../../hooks/useRequestData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TripCard } from "../../components/TripCard/TripCard";
import { goToAdminPage } from "../../routes/coordinator";

const HomePage = () => {
    const navigate = useNavigate();
    const [tripsData] = useRequestData("trips", {});

    useEffect(() => {
        if (localStorage.getItem('token')){
            goToAdminPage(navigate)
        }
    }, []);

    const tripsList = tripsData.trips?
    tripsData.trips.map((trip)=>{
        return (
            <TripCard
                key={trip.id}
                trip={trip}
            />
        )
    }) : (<p>Loading...</p>)

    return (
        <>
        <Header currentPage={"homepage"}/>
        <hr/>
        <main>
            <div>
                <h2>Subscribe to your new trip!</h2>
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

export default HomePage;
