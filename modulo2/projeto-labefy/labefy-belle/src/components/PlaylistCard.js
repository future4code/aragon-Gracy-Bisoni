import React from "react";
import styled from "styled-components";

const PlaylistName = styled.div `
    cursor: pointer;
    font-family: sans-serif;
`

const PlaylistCardContainer = styled.div`
    border: solid black 1px;
    padding: 1%;
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
`

function PlaylistCard (props){
    return(
        <PlaylistCardContainer>
            <PlaylistName onClick= {() => props.changePage("playlistDetails", props.playlistId)}
            >{props.name}
            </PlaylistName>
            
            <button
            onClick={() => props.deletePlaylist(props.playlistId)}>
                Deletar playlist
            </button>


        </PlaylistCardContainer>
    )
}

export default PlaylistCard