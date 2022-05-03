import React from "react";
import styled from 'styled-components';

class Etapa1 extends React.Component{
    render() {
        return(
            <div>
            <h2>ETAPA 1 - DADOS GERAIS</h2>
            <p>1. Qual é o seu nome?</p>
            <input placeholder="Seu nome aqui"></input>
            <p>2. Qual é a sua idade?</p>
            <input placeholder="Sua idade aqui"></input>
            <p>3. Qual é o seu e-mail?</p>
            <input type="email"placeholder="Seu email aqui"></input>
            <p>4. Qual é a sua escolaridade?</p>
            <select>
                <option value="ensino médio incompleto">Ensino médio incompleto</option>
                <option value="ensino médio completo">Ensino médio completo</option>
                <option value="ensino superior incompleto">Ensino superior incompleto</option>
                <option value="ensino superior completo">Ensino superior completo</option>
            </select>
            </div>
        );
    }
}

export default Etapa1