import React from "react";
import styled from 'styled-components';

class Etapa2 extends React.Component{
    render() {
        return(
            <div>
            <h2>ETAPA 2 - INFORMAÇÕES DE ENSINO</h2>
            <p>5. Qual curso?</p>
            <input placeholder="Curso"></input>
            <p>6. Qual instituição de ensino?</p>
            <input placeholder="Instituição de ensino"></input>
            </div>
        );
    }
}

export default Etapa2