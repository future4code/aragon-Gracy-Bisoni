import React from "react";
import axios from "axios";
import styled from "styled-components";

class RegisterPage extends React.Component{
       
    render(){
        return(
           <div>
            <h2> Faça seu cadastro!</h2>
            <input
            placeholder="Nome"
            type="text"
            value={this.props.name}
            onChange={this.props.onChangeName}
            />
            <input
            placeholder="E-mail"
            type="email"
            email={this.props.email}
            onChange={this.props.onChangeEmail}
            />
            <button 
            onClick={() => this.props.createUser()}>
                Criar Usuário
            </button>
            </div> 

        )
    }
}

export default RegisterPage