import React from "react";
import axios from "axios";
import { goToFeed } from "../routes/coordinator";
import { BASE_URL } from "../constants/urls";

export const requestLogin = (form, clear, navigate) => {
    const body = {
        email: form.email,
        password: form.password
    }

    axios
    .post(`${BASE_URL}/users/login`, body)
    .then((res)=> {
        //aqui eu armazeno no localStorage um token de login/identificação e o email do usuário
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userEmail", form.email)
        alert("Successful login!")
        //Em seguida, redireciono ele para a página de Feed
        goToFeed(navigate)
    })
    .catch((err)=> {
        alert("Something got wrong, try again!")
        clear()
    })
};