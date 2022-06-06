import React from "react";
import styled from "styled-components";
import PlaylistsList from "./PlaylistsList";
import PlaylistDetails from "./PlaylistDetails";

export default class PlaylistManage extends React.Component {
    state = {
        currentPage: "playlists",
        playlistId: ""
    }

    changePage = (currentPage, playlistId) => {
        this.setState({
            currentPage: currentPage,
            playlistId: playlistId
        })
    }

    render(){
        const renderCurrentPage = () => {
            if (this.state.currentPage === "playlists") {
                return <PlaylistsList
                    changePage = {this.changePage}
                    />
            } else if (this.state.currentPage === "playlistDetails") {
                return <PlaylistDetails
                changePage={this.changePage}
                playlistId = {this.state.playlistId}
                />
            }
        }

        return (
            <div>
                {renderCurrentPage()}
            </div>
        )
    }

}