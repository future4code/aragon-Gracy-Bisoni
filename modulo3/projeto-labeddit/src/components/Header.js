import React from "react";
import { goToLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const Header = (props) => {
    const navigate = useNavigate();
    
    return (
        <header>
            <h1>LabEddit</h1>
        </header>
    )
}