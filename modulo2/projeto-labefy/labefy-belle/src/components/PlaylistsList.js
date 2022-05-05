import React from "react";
import styled from "styled-components";
import axios from "axios";

const axiosAuth = {
    headers: {
        Authorization: "belle-aragon",
    }
};

const PlaylistCard = styled.div`
`

export default class PlaylistsList extends React.Component {

    state = {
        playlists: []
    }

    componentDidMount() {
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

    render() {
        console.log(this.state.playlists)

        const renderizaPlaylists = () =>{
            return this.state.playlists.map((item) => {
            return (
                <PlaylistCard key={item.id}>
                    {item.name}
                    <button
                        onClick={() => this.deletePlaylist(item.id)}
                    >Deletar</button>
                </PlaylistCard>)
        });
        }
        return (
            <div>
                <h2>Lista de Playlists</h2>
                {renderizaPlaylists()}
                {renderizaPlaylists().length === 0 
                && <div>Carregando...</div> }
            </div>
        )
    }
}