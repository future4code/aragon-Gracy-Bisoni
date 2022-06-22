import React from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed } from "../routes/coordinator";

export const ErrorPage = () => {
    const navigate = useNavigate()
    return(
    <>
            <h1>Error 400 - Page not found!</h1>
            <button onClick={() => goToFeed(navigate)}>Back to Feed</button>
    </>
    )
}