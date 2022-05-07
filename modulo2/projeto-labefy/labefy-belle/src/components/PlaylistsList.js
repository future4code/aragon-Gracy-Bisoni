import React from "react";
import styled from "styled-components";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";

const axiosAuth = {
    headers: {
        Authorization: "belle-aragon",
    }
};

// const PlaylistCard = styled.div`
//     display: flex;
//     justify-content: space-between;
//     border: solid black 1px;
//     width: 300px;
//     height: 50px;
//     align-items: center;
//     margin: 10px;
//     padding: 0 10px;
// `

export default class PlaylistsList extends React.Component {

    state = {
        playlists: [],
        musics:[]
    }

    componentDidMount() {
        this.getAllPlaylists()
    }

    componentDidUpdate() {
        this.getAllPlaylists()
    }

    getAllPlaylists = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";
        axios
            .get(
                url, axiosAuth
            )
            .then((res) => {
                this.setState({ playlists: res.data.result.list })
                console.log(res.data.result.list)
            })
            .catch((err) => {
                console.log(err.res.data)
                alert(`Erro ao carregar playlists`)
            })
    }

    deletePlaylist = (playlistId) => {
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}`
        if (window.confirm ("Certeza que quer deletar a playlist?")){
        axios
            .delete(
                url, axiosAuth
            )
            .then((res) => {
                alert(`A playlist foi deletada`)
                this.getAllPlaylists()
            })
            .catch((err) => {
                alert(`Erro ao deletar playlist`)
                console.log(err.res.data)
            })
        }
    }


    render() {
        
        const renderPlaylists = () =>{
            return this.state.playlists.map((item) => {
            return (
                <PlaylistCard 
                key={item.id}
                changePage={this.props.changePage}
                name = {item.name}
                playlistId={item.id}
                deletePlaylist = {this.deletePlaylist}
                >
                    <p>{item.name}</p>
                </PlaylistCard>)
        });
        }
        return (
            <div>
                <h2>Lista de Playlists</h2>
                {renderPlaylists()}
                {renderPlaylists().length === 0 
                && <div>Carregando...</div> }
            </div>
        )
    }
}