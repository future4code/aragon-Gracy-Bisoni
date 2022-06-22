import React from "react";
import axios from "axios";
import styled from "styled-components";

const MainContainer = styled.div`
 `

class RegisterPage extends React.Component{

    state={
        name:"",
        email:""
    };

    handleInputName = (e) => {
        this.setState({name : e.target.value});
    };
    
    handleInputEmail = (e) => {
        this.setState({email : e.target.value});
    };

    createUser = () => {
        const body= {
         name: this.state.name,
         email: this.state.email 
        };
  
      axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`,
        body,
        {
          headers: {
            Authorization: "belle-aragon"
          }
        }
      )
      .then((res) => {
        console.log(res)
        alert('Usuário cadastrado com sucesso!')
        this.setState({name:"", email:""});
      }).catch((err) =>{
        alert ('Tente novamente!')
        console.log(err.response.data)
      });
    }
       
    render(){
        return(
           <MainContainer>
            <button
            onClick={this.props.goToUsersList}
            >Ir para lista de usuários
            </button>

            <h2> Faça seu cadastro!</h2>
            <input
            placeholder="Nome"
            type="text"
            value={this.state.name}
            onChange={this.handleInputName}
            />
            <input
            placeholder="E-mail"
            type="email"
            value={this.state.email}
            onChange={this.handleInputEmail}
            />

            <button 
            onClick={() => this.createUser()}>
                Criar Usuário
            </button>
            </MainContainer> 

        )
    }
}

export default RegisterPage