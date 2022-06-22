import React from "react";
import { goToLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Stack, Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";

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
        <>
        <Stack
            sx={{display:'flex', flexDirection:'row'}}
        >
            <Avatar
                src="https://cdn-icons-png.flaticon.com/512/1767/1767183.png" 
                sx={{ width: 70, height: 70, marginTop:'10px' }} 
                alt="purple robot"/>
            <Typography sx={{margin:'20px'}} variant="h3">LabEddit</Typography>
        </Stack>
            {props.isProtected && (
                <>
                    <Typography variant="h6" textAlign={"center"}>Welcome, {localStorage.getItem("userEmail")}! 😊</Typography>
                    <Stack
                        alignItems={"flex-end"}
                    >
                    <Button 
                        color="secondary"
                        onClick={logout}><Logout/></Button>
                    </Stack>
                </>
            )}
        </>
    )
}