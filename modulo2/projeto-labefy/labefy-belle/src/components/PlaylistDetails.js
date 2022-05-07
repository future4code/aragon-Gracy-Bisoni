import React from "react";
import axios from "axios";
import styled from "styled-components";
import TrackCard from "./TrackCard";

const axiosAuth = {
    headers: {
    Authorization: "belle-aragon"
    }
}

export default class Tracks extends React.Component {
    state={
        musics:[],
        musicName: "",
        artist: "",
        url: ""
    }

    componentDidMount = () => {
        this.getPlaylistTracks()
    }

    getPlaylistTracks = () => {
        const url= `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlistId}/tracks`
        axios
        .get (url, axiosAuth)
        .then ((res) => {
            this.setState({ musics: res.data.result.tracks })
            console.log(res.data.result.tracks)
        })
        .catch((err) =>{
            console.log(err.res.data)
        })
    }

    deleteTrack = (trackId) => {
        if (window.confirm ("Certeza que quer excluir a música?")){
        axios
        .delete (
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlistId}/tracks/${trackId}`,
        axiosAuth)
        .then((res) => {
            this.getPlaylistTracks();
            alert (`Sua música foi excluída!`)

        })
        .catch ((err) => {
            console.log(err)
            alert (`Tente novamente`)
        })
        }
    }

    changeInputValues = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    addTrack = (ev) => {
        ev.preventDefault()
        const body = {
            name: this.state.musicName,
            artist: this.state.artist,
            url:this.state.url
        }
        
        axios
        .post(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlistId}/tracks`,
            body,
            axiosAuth
        )
        .then(() =>{
            this.getPlaylistTracks()
        })
        .catch((err) => {
            console.log(err)
        })

        this.setState({
            musicName:"",
            artist:"",
            url:""
        })

    }

    render(){
        const musics = this.state.musics.map((music) => {
            return (
                <TrackCard
                key = {music.id}
                musicName = {music.name}
                artist = {music.artist}
                url = {music.url}
                trackId = {music.id}
                deleteTrack = {this.deleteTrack}
                />
            )
        })

        return(
            <div>
                <form onSubmit={this.addTrack}>
                    <div>
                        <label>Nome da música:</label>
                        <input
                        placeholder="Nome da música"
                        name="musicName"
                        value={this.state.musicName}
                        onChange={this.changeInputValues}
                        />
                    </div>
                    <div>
                        <label>Artista:</label>
                        <input
                        placeholder="Nome do Artista"
                        name="artist"
                        value={this.state.artist}
                        onChange={this.changeInputValues}
                        />
                    </div>
                    <div>
                        <label>URL:</label>
                        <input
                        placeholder="URL da música"
                        name="url"
                        value={this.state.url}
                        onChange= {this.changeInputValues}
                        />
                    </div>
                    <button type="submit"> Adicionar Música</button>
                </form>
                {musics}
                <button
                onClick={() => this.props.changePage("playlists", "")}>
                    Voltar para página de playlists
                </button>
            </div>
        )
    }
}