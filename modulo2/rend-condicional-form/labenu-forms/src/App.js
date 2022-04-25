import React from 'react';
import logo from './logo.svg';
import './App.css';
import Etapa1 from './components/Etapa1/Etapa1';
import styled from 'styled-components'
import Etapa2 from './components/Etapa2/Etapa2';
import Etapa3 from './components/Etapa3/Etapa3';
import Final from './components/Final/Final';

const MainContainer = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

class App extends React.Component {

  state = {
    etapa: 1,
  }

  renderizaEtapa = () => {
    switch (this.state.etapa) {
      case 1:
        return <Etapa1/>;
      case 2:
        return <Etapa2/>;
      case 3:
        return <Etapa3/>;
      case 4:
        return <Final/>;
        break;
      default:
        return <Etapa1/>
}

  }

  irParaProxima = () => {
    this.setState({
      etapa: this.state.etapa +1
    })
  }

  render(){
    return (
    <MainContainer>
    
      {this.renderizaEtapa()}
      {
        this.state.etapa !== 4 
        && <button onClick={this.irParaProxima}>Próxima etapa</button>
      }

    </MainContainer>
    );
  }
}

export default App;
