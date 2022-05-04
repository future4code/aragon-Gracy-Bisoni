import React from "react";
import axios from "axios";

const axiosAuth = {
    headers: {
        Authorization: "isabelle-bisoni-aragon"
    }
};

class UsersList extends React.Component{
    state = {
        usersList: [],
        page: "usersList",
        userID: "",
        userName: "",
    }

    componentDidMount () {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        axios
          .get(
            "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
            axiosAuth
          )
          .then(response => {
            this.setState({ usersList: response.data });
          });
        };

    deleteUser = (userID) => {
            axios
            .delete (
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userID}`,
                axiosAuth
            )
            .then(() => {
                alert ('O usuário foi deletado!')
                this.getAllUsers()
            })
            .catch((error) => {
                console.log(error)
                alert('Erro ao apagar usuário, tente novamente.')
            })
        }
    
    render(){
        const users = this.state.usersList
        return(
            <div>
                <ul>
                    {users.length === 0 
                    && <div>Carregando...</div> }
                    {users.map((user) => {
                        return (
                            <li
                            key={user.id}>
                                {user.name}
                                <button
                                onClick={() => this.deleteUser(user.id)}
                                >Deletar</button>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )

    }
}

    export default UsersList
    