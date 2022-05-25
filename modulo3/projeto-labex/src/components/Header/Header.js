import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { goToHomePage } from "../../routes/coordinator";
import { loginRequest } from "../../services/requests"

const Header = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleInputPassword = (e) => {
        setPassword(e.target.value)
    }

    const login = (e) => {
        e.preventDefault();
        loginRequest ( email, password, navigate )
    }

    const logout = () => {
        localStorage.removeItem("token");
        goToHomePage(navigate);
    };

    const renderHeader =
        localStorage.getItem('token')?
            (<button
                onClick={logout}
            >Logout</button>
            
            ) : (
                <form onSubmit={login}>
                    <h3>Admin access:</h3>
                    <label htmlFor="email">Email: </label>
                        <input
                            name="email"
                            onChange={handleInputEmail}
                            id={"email"}
                            value={email}
                            type={"email"}
                        />

                        <br/>
                
                    <label htmlFor="password">Password: </label>
                        <input
                            name="password"
                            onChange={handleInputPassword}
                            id={"password"}
                            value={password}
                            type={"password"}
                        />
                        <br/>
                    <button
                        type="submit"
                    >Login</button>

                </form>
            )

    return (
        <header>
            <h1>LabeX</h1>
            <hr/>
            {renderHeader}
        </header>
    )
};

export default Header;