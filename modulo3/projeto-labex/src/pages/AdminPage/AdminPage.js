import React from "react";
import Header from '../../components/Header/Header'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { goToHomePage } from "../../routes/coordinator";
import { deleteTrip, createTrip } from "../../services/requests";
import { useRequestData } from "../../hooks/useRequestData";
import { useForm } from "../../hooks/useForm";
import { TripCard } from "../../components/TripCard/TripCard";
import { planets } from "../../constants/planets";

const AdminPage = () => {
    
    const navigate = useNavigate();
    const [tripsData, getTripsData] = useRequestData('trips', {})

    const {form, onChange, resetForm,} = useForm({
        name:"",
        planet:"",
        date:"",
        description:"",
        durationInDays:""
    })
    
    useEffect (() => {
        if(!localStorage.getItem('token')){
            goToHomePage(navigate)
        }
    }, [])

    //Não entendi como usa o history.push, ler melhor

    const onClickCreateTrip = (e) => {
        e.preventDefault()
        createTrip(form, resetForm, getTripsData)

    }

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
                <form onSubmit={onClickCreateTrip}>
                    <label htmlFor={"name"}>Name: </label>
                    <input
                        id="name"
                        name={"name"}
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                    <br/>
                    <label htmlFor="planet">Planet: </label>
                    <select
                        id="planet"
                        name={"planet"}
                        defaultValue={""}
                        onChange={onChange}
                    >
                        <option value={""} disabled>Choose a planet:</option>
                         {planets.map((planet) =>{
                             return <option value={planet} key={planet}>{planet}</option>
                         })}

                    </select>
                    <br/>
                    <label htmlFor="date">Launch Date:</label>
                    <input
                        id="date"
                        type={"date"}
                        name={"date"}
                        value={form.date}
                        onChange={onChange}
                        required
                    />
                    <br/>
                    <label htmlFor="description">Description: </label>
                    <input
                        id="description"
                        name={"description"}
                        value={form.description}
                        onChange={onChange}
                        required
                    />
                    <br/>
                    <label htmlFor="duration">Duration in days: </label>
                    <input
                        id="duration"
                        type={"number"}
                        name={"durationInDays"}
                        value={form.durationInDays}
                        onChange={onChange}
                        required
                    />
                    <button type={"submit"}>Create</button>
                </form>
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