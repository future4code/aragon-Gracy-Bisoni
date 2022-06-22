import axios from "axios";
import React from "react";
import styled from "styled-components";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UsersList from "./components/UsersList/UsersList"


class App extends React.Component {
  state = {
    currentPage: "register",
  };


  // changePage = () => {
  //   if (this.state.currentPage === "register") {
  //     this.setState({currentPage: "users"})
  //   } else {
  //     this.setState({currentPage: "register"})
  //   }
  // };

  goToUsersList = () => {
    this.setState({currentPage:"users"})
  }

  goToRegisterPage = () => {
    this.setState({currentPage: "register"})
  }

  changePage = () => {
    switch(this.state.currentPage){
      case "register":
        return <RegisterPage goToUsersList = {this.goToUsersList}/>
      case "users":
      return <UsersList goToRegisterPage= {this.goToRegisterPage}/>
      default:
        return "Erro"
    }
  }

  render(){
  return (
    <div className="App">     
      {this.changePage()}
    </div>
  );
}
}

export default App;
