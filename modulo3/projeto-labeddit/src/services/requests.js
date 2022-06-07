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
    .post
}