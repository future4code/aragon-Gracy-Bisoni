import React from "react";
import styled from 'styled-components'

class Etapa3 extends React.Component {
    render(){
        return(
        <div>
            <h2>ETAPA 3 - INFORMAÇÕES DE ENSINO</h2>
            <p>5.Por que não concluiu o ensino superior?</p>
            <input></input>
            <p>6. Você fez algum curso complementar?</p>
            <select>
               <option value="nenhum">Nenhum</option>
               <option value="ensino técnico">Ensino técnico</option>
               <option value="curso de idiomas">Curso de idiomas</option>
            </select>
        </div>
        );
    }
}

export default Etapa3