import React from "react";
import axios from "axios";
import { goToAdminPage } from "../routes/coordinator";
import { BASE_URL, API_AUTH } from "../constants/urls";

export const loginRequest = ( email, password, navigate) => {
    const body = {
        email: email,
        password: password
    }
    const url = `${BASE_URL}/${API_AUTH}/login`

    axios
    .post( url, body )
        .then ((response) => {
            localStorage.setItem('token',response.data.token);
            alert ('Successful login!')
            goToAdminPage(navigate)
        }) 
        .catch((err) => {
            alert('Login failed, try again')
        })
        

}