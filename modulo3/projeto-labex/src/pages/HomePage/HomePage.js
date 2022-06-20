import React, { useState } from "react";
import Header from '../../components/Header/Header'
import { useRequestData } from "../../hooks/useRequestData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TripCard } from "../../components/TripCard/TripCard";
import { goToAdminPage } from "../../routes/coordinator";
import { apply } from "../../services/requests";
import { useForm } from "../../hooks/useForm";
import { countries } from "../../constants/countries";


const HomePage = () => {
    const navigate = useNavigate();
    const [tripsData] = useRequestData("trips", {});
    const [tripId, setTripId] = useState("")

    const {form, onChange, resetForm} = useForm(
        { name: "",
          age: "", 
          applicationText: "", 
          profession: "", 
          country: "" }
    )

    useEffect(() => {
        if (localStorage.getItem('token')){
            goToAdminPage(navigate)
        }
    }, []);

    const chooseTrip = (e) => {
        setTripId(e.target.value)
    };

    const onClickApplication = (e) => {
        e.preventDefault()
        apply(form, tripId, resetForm)
    }
    
    const tripsOptions = tripsData.trips && tripsData.trips.map((trip) => {
        return <option 
                key={trip.id} 
                value={trip.id}>{trip.name}</option>;
    });

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
                <form onSubmit={onClickApplication}>
                    <label htmlFor="trip">Trip: </label>
                    <select
                        id="trip"
                        defaultValue={""}
                        onChange={chooseTrip}
                        required
                    >
                        <option value={""} disabled>Choose a trip...</option>
                        {tripsOptions}
                    </select>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor="age">Age: </label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={onChange}
                        min={18}
                        required
                    />
                    <label htmlFor="applicationText">Application Text </label>
                    <input
                        type={"textarea"}
                        id="applicationText"
                        name="applicationText"
                        value={form.applicationText}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor={"profession"}>Profession: </label>
                        <input
                            id={"profession"}
                            name={"profession"}
                            value={form.profession}
                            onChange={onChange}
                            required
                        />
                        <label htmlFor={"country"}>Country: </label>
                        <select
                            id={"country"}
                            name={"country"}
                            value={form.country}
                            onChange={onChange}
                            required
                        >
                            <option 
                                value={""} 
                                disabled
                            >Choose a Country...</option>
                            
                            {countries.map((country) => {
                                return <option value={country} key={country}>{country}</option>
                            })}
                        </select>
                        <button type={"submit"}>Send application</button>

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

export default HomePage;
