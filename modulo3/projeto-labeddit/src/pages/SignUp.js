import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useForm } from "../hooks/useForm";
import { useUnprotectedPage } from "../hooks/useUnprotectedPage";
import { requestSignup } from "../services/requests";
import { goToLogin } from "../routes/coordinator";

export const SignUp = () => {
    useUnprotectedPage()
    const navigate = useNavigate()
    const {form, clear, onChange} = useForm({name:"", email:"", password:"" })

    const signup = (e) =>{
        e.preventDefault()
        requestSignup(form, clear, navigate)
    }
    return(
        <>
            <Header
                isProtected={false}
            />
            <hr/>
            <section>
                <button onClick={() => goToLogin(navigate)}>Back to login page</button>
                <h2>Create new user</h2>
                <form onSubmit={signup}>
                    <label htmlFor={"name"}>Name: </label>
                    <input
                        id={"name"}
                        name={"name"}
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <label htmlFor={"email"}>E-mail: </label>
                    <input
                        id={"email"}
                        type={"email"}
                        name={"email"}
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <label htmlFor={"password"}>Password: </label>
                    <input
                        id={"password"}
                        type={"password"}
                        name={"password"}
                        value={form.password}
                        onChange={onChange}
                        pattern={"^.{8,30}$"}
                        title={"Your password need to have at least 8 and at maximum 30 caracters"}
                        required
                    />
                    <br />
                    <button type={"submit"}>Create user</button>
                </form>
            </section>
            
        </>
    )
}