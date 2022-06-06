import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import styled from "styled-components"

const SelectNav = styled.nav`
  text-align:center;
  margin-top: 20px;
  
` 

const Header = styled.header`
  text-align:center;
  background-color: aliceblue;
  border: 1px black solid;
  display: flex;
  justify-content: center;
`
const Imagem = styled.img`
  width: 6vw;
  height: 12vh;
`


function App() {
  // Passo 3b
  const [pokeList, setPokeList] = useState([])
  const [pokeName, setPokeName] = useState("")


  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((res) => {
        setPokeList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const changePokeName = (event) => {
    setPokeName(event.target.value)
  };

  // Passo 3e
  const pokeOptions = pokeList.map(pokemon => {
    return (
      <option key={pokemon.name} value={pokemon.name}>
        {pokemon.name}
      </option>
    );
  });


  const pokemon = pokeName && <PokeCard pokeName={pokeName}/>;

  return (
    <>
      <Header>
        <Imagem src="https://cdn-icons-png.flaticon.com/512/188/188940.png"/>
        <h1>Pokédex - Indigo League</h1>
      </Header>
      <SelectNav>
        <label htmlFor={"select-pokemon"}>Selecione um pokemon: </label>

        <select id={"select-pokemon"} onChange={changePokeName} >
          <option value={""}>Nenhum</option>
          {pokeOptions}
        </select>
      </SelectNav>
      <main>
        {pokemon}
      </main>
    </>
  );
};

export default App;