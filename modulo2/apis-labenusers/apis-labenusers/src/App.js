import axios from "axios";
import React from "react";
import styled from "styled-components";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UsersList from "./components/UsersList/UsersList"


class App extends React.Component {
  state = {
    page: "register",
    inputName: "",
    inputEmail: "",
  };

  onChangeInputName = (event) => {
    this.setState({inputName : event.target.value});
  };

  onChangeInputEmail = (event) => {
    this.setState({inputEmail : event.target.value});
  };

  createUser = () => {
      const body= {
       name: this.state.inputName,
       email: this.state.inputEmail 
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
    .then(() => {
      alert('Usuário cadastrado com sucesso!')
      this.setState({inputName:"", inputEmail:""});
    }).catch((error) =>{
      alert ('Tente novamente!')
      console.log(error)
    });
  }

  changePage = () => {
    if (this.state.page === "register") {
      this.setState({page: "users"})
    } else {
      this.setState({page: "register"})
    }
  };

  render(){
  return (
    <div className="App">
      <button
      onClick={this.changePage}
      >
        Trocar de página
      </button>
      
      {this.state.page === "register" ?
      <RegisterPage
      name={this.state.inputName}
      onChangeName = {this.onChangeInputName}

      email={this.state.inputEmail}
      onChangeEmail = {this.onChangeInputEmail}

      createUser ={this.createUser}

      />
      :<UsersList/>
      }
      
    </div>
  );
}
}

export default App;
