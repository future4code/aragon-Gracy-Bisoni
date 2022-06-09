import React from "react";
import { goToLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const Header = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        if(window.confirm("Are you sure you want logout?")){
            localStorage.removeItem("token")
            localStorage.removeItem("userEmail")
            goToLogin(navigate)
            alert("Successfully logout!")
        }
    }
    
    return (
        <header>
            <h1>LabEddit</h1>
            {props.isProtected && (
                <>
                    <h4>Welcome, {localStorage.getItem("userEmail")}! 😊</h4>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </header>
    )
}