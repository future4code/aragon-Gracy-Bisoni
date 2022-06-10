import React from "react";
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useUnprotectedPage } from "../hooks/useUnprotectedPage";
import { useForm } from "../hooks/useForm";
import { requestLogin } from "../services/requests";
import { goToSignUp } from "../routes/coordinator";
import { Button, Typography, Stack } from "@mui/material";
import '@fontsource/roboto/400.css';
import { IconButton } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

  

export const Login = () => {
    useUnprotectedPage()
    const navigate = useNavigate()

    const {form, onChange, clear} = useForm({email:"", password:""})

    const login = (e) => {
        e.preventDefault()
        // vou aqui embaixo chamar de fato a requisição de login, passando como parâmetro
        // as informações do formulário (que desestruturei ali em cima) e 
        // as funções clear e navigate
        requestLogin(form, clear, navigate)
    }
    return(
    <>
        <Header
            isProtected={false}
        />
        <hr/>
        <Typography variant="h5">Login</Typography>
        <Stack
            alignItems={"center"}
            direction={"row"}
        >
            <form onSubmit={login}>
                <Typography htmlFor="email">Email:</Typography>
                <input
                    id={'email'}
                    type={'email'}
                    name={'email'}
                    value={form.email}
                    onChange={onChange}
                />
                <Typography htmlFor="password">Password:</Typography>
                <input
                    id={"password"}
                    type={"password"}
                    name={"password"}
                    value={form.password}
                    onChange={onChange}
                />
                <br/>
                <IconButton 
                    variant="contained"
                    color="secondary" 
                    size="small"
                    type={"submit"}
                    >
                    
                        <LoginOutlined/>
                    </IconButton>
            </form>
        </Stack>
        <hr/>
        <Typography variant="h5">Don't have an account yet?</Typography>
        <br/>
        <Button 
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => goToSignUp(navigate)}>
                Sign Up</Button>
    </>
    )
}