import React from "react";
import axios from "axios";
import styled from "styled-components";

const axiosAuth = {
    headers: {
        Authorization: "belle-aragon"
    }
};

const MainContainer = styled.div`
    
`

const UserCard = styled.div`
    border: 1px black solid;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    width: 200px;
`

class UsersList extends React.Component{
    state = {
        users: [],
        userID: "",
        userName: "",
    }

    componentDidMount () {
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios
          .get(
            "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
            axiosAuth
          )
          .then((res) => {
            this.setState({users:res.data})
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        };

    deleteUser = (userID) => {
            axios
            .delete (
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userID}`,
                axiosAuth
            )
            .then((res) => {
                alert ('O usuário foi deletado!')
                this.getAllUsers()
            })
            .catch((err) => {
                console.log(err.res.data)
                alert('Erro')
            })
        }
    
    render(){
        const users = this.state.users.map((user) =>{
            return <UserCard key={user.id}>
                {user.name}
                <button
                onClick={() => this.deleteUser(user.id)}
                >Deletar</button>
            </UserCard>
        })
        return(
            <MainContainer>
                <button
                onClick={this.props.goToRegisterPage}
                >
                    Ir para cadastro
                </button>
                <h2>Lista de usuários</h2>
                {users}
                {users.length === 0 
                && <div>Carregando...</div> }
              </MainContainer>
        )

    }
}

    export default UsersList
    