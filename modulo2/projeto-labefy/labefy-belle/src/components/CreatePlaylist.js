import axios from "axios";
import React from "react";
import styled from "styled-components";

const axiosAuth = {
    headers: {
      Authorization: "belle-aragon",
    }
  };

export default class CreatePlaylist extends React.Component {

    state={
        playlistName: ""
      }
    
    
      handleInputPlaylistName = (ev) => {
        this.setState({playlistName: ev.target.value})
      }
    
      createPlaylist = () => {
        const body = {
          name: this.state.playlistName,
        };
    
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"
    
        axios
        .post (
          url, body, axiosAuth
        ) 
        .then ((res) => {
          alert (`Playlist "${this.state.playlistName}" criada com sucesso`)
          this.setState({playlistName:""})
        })
        .catch((err) => {
          alert (`Erro ao criar playlist (Dica: será que já não existe uma playlist com o mesmo nome?)`)
          console.log (err.res.data)
        });
      };

    render(){
        return(
            <div>
            <h2>Playlists</h2>
            <h3>Insira abaixo o nome da sua nova playlist </h3>

            <input

                placeholder="Insira o nome da sua playlist"
                onChange={this.handleInputPlaylistName}
                value={this.state.playlistName}
                />
                <button
                onClick={this.createPlaylist}
                >Criar playlist</button>

            </div>
                )
            }
        }
        