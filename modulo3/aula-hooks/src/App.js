import { render } from '@testing-library/react';
import {useState} from 'react'
import './App.css';

function App() {
  const [input, setInput] = useState ("")
  const [lista, setLista] = useState([])
  const [contador, setContador] = useState(0)

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const addTexto = () => {
    const novaLista = [...lista, input]
    setLista(novaLista)
  }

  const renderLista = lista.map((item) => {
    return <ul>
      <li>
        {item}
      </li>
    </ul>
  })

  const incrementar = () => {
    setContador(contador + 1)
  }


  return (
    <div className="App">
      <label htmlFor='texto'>Texto:</label>
      <input placeholder='Texto aqui' id="texto" value={input} onChange={handleInput}/>
      <button
        onClick={addTexto}
      >Adicionar</button>
      <h1>{contador}</h1>
      <button onClick={incrementar}>Incrementar</button>
      {renderLista}
    </div>
  );
}

export default App;
