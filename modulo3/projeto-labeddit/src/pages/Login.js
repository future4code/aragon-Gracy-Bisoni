import React from "react";
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useUnprotectedPage } from "../hooks/useUnprotectedPage";
import { useForm } from "../hooks/useForm";
import { requestLogin } from "../services/requests";
import { goToSignUp } from "../routes/coordinator";

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
        <h2>Login</h2>
        <section>
            <form onSubmit={login}>
                <label htmlFor="email">Email:</label>
                <input
                    id={'email'}
                    type={'email'}
                    name={'email'}
                    value={form.email}
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    id={"password"}
                    type={"password"}
                    name={"password"}
                    value={form.password}
                    onChange={onChange}
                />
                <button type={"submit"}>Log In</button>
            </form>
        </section>
        <hr/>
        <h2>Don't have an account yet?</h2>
        <button onClick={() => goToSignUp(navigate)}>Sign Up</button>
    </>
    )
}