import React from "react";
import axios from "axios";
import Header from '../../components/Header/Header'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { goToHomePage } from "../../routes/coordinator";

const AdminPage = () => {
    
    const navigate = useNavigate();
    
    useEffect (() => {
        if(!localStorage.getItem('token')){
            goToHomePage(navigate)
        }
    }, [])

    //Não entendi como usa o history.push, ler melhor


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
            </div>
        </main>

        </>
    )
}

export default AdminPage;