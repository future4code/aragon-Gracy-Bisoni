import React from "react";
import axios from "axios";
import CreatePlaylist from "./components/CreatePlaylist";
import PlaylistsList from "./components/PlaylistsList";
import PlaylistManage from "./components/PlaylistManage";
import Header from "./components/Header"

const axiosAuth = {
  headers: {
    Authorization: "belle-aragon",
  }
};

export default class App extends React.Component {
  state = {
    currentPage: "createPlaylist"
  }

  changePage = (currentPage) => {
    this.setState({currentPage: currentPage})
  }

  render(){
    const renderCurrentPage = () => {
      if (this.state.currentPage === "createPlaylist") {
        return <CreatePlaylist/>
      } else if (this.state.currentPage === "playlistManage") {
        return <PlaylistManage/>
      }
    }
  return (
    <div className="App">
      <Header
      changePage= {this.changePage}
      />
      {renderCurrentPage()} 
      
    </div>
  );
  }
};
