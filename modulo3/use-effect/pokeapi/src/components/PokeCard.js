import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"

const Card = styled.figure`
  text-align: center;
  padding-top: 20px;
  margin-left: 10vh;
  margin-right: 10vh;

`
const Imagem = styled.img `
  width: 20vw;
  border-radius: 100%;
  border: 2px solid blue;
  background-color: aliceblue;
  padding: 1%;
`


function PokeCard(props) {
  // Passo 4b
  const [pokemonAtual, setPokemonAtual] = useState({})

  // Passo 4c
  useEffect(() => {
    pegaPokemon(props.pokeName)
  }, []);

  // Passo 4c

  useEffect(() => {
    if (props.pokeName !== "") {
      pegaPokemon(props.pokeName)
    }
  }, [props.pokeName]);

  // Passo 4c
  const pegaPokemon = (pokeName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((res) => {
        setPokemonAtual(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
        <strong > {pokemonAtual.name && pokemonAtual.name.toUpperCase()}</strong>

        <p>Peso: {pokemonAtual.weight * 0.1} Kg</p>

        <p>Tipo: {pokemonAtual.types && pokemonAtual.types[0].type.name} </p>

        {pokemonAtual.sprites && (
          <Imagem src={pokemonAtual.sprites.front_default} alt={pokemonAtual.name} />
        )}
    </Card>
  );
};

export default PokeCard;