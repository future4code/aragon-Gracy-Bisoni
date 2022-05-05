import React from "react";
import axios from "axios";
import CreatePlaylist from "./components/CreatePlaylist";
import PlaylistsList from "./components/PlaylistsList";

const axiosAuth = {
  headers: {
    Authorization: "belle-aragon",
  }
};

export default class App extends React.Component {

  render(){
  return (
    <div className="App">
      <h1> Labefy </h1>
      <CreatePlaylist/>
      <PlaylistsList/>
      
    </div>
  );
  }
};
