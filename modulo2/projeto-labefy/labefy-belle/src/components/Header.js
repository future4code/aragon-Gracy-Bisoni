import React from "react";
import styled from "styled-components";

function Header (props) {
    return (<div>
        <h1>Labefy</h1>
        <div>
            <button 
            onClick = {() => props.changePage("createPlaylist")}>
                Criar Playlists
            </button>
            <button
            onClick = {() => props.changePage ("playlistManage")} >
                Gerenciar Playlists
            </button>
        </div>
    </div>
    )
}

export default Header