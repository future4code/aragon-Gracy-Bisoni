import React from "react";
import styled from "styled-components";

function TrackCard (props) {
    return (
        <div>
            <div>
            <h4> {props.musicName} - </h4>
            <p> {props.artist}</p>
            </div>
            <audio src= {props.url} controls ="controls"/>  
            <button
            onClick={()=> props.deleteTrack(props.trackId)}>
                Deletar música
            </button>      
        </div>
    )
}

export default TrackCard