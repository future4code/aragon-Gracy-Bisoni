import React from 'react';
import './App.css';
import CardGrande from './components/CardGrande/CardGrande';
import CardPequeno from './components/CardPequeno/CardPequeno';
import ImagemButton from './components/ImagemButton/ImagemButton';
import FotoIsa from './img/Eu.jpg'

function App() {
  return (
    <div className="App">
      <div className="page-section-container">
        <h2>Dados pessoais</h2>
        <CardGrande 
          imagem={FotoIsa} 
          nome="Isabelle Daru Bisoni" 
          descricao="Oi, eu sou a Isa. Sou uma das estudantes da Labenu, na turma Aragon. Adoro feriados que me ajudam a colocar a matéria em dia."
        />
        
        <ImagemButton 
          imagem="https://cdn-icons-png.flaticon.com/512/2026/2026596.png" 
          texto="Ver mais"
        />
      </div>
      <div className='page-section-container'>
        <CardPequeno
        imagem="https://cdn-icons-png.flaticon.com/512/561/561127.png"
        texto="E-mail: isadarub@gmail.com"
        />
        <CardPequeno
        imagem="https://i.pinimg.com/736x/f0/c7/b9/f0c7b9489446715cae72085a470f0ed9.jpg"
        texto="Endereço: Rua Honduras, 573 - Colombo/PR"
        />
      </div>

      <div className="page-section-container">
        <h2>Experiências profissionais</h2>
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4D0BAQGzcDkbL6tGMw/company-logo_200_200/0/1519856418287?e=2147483647&v=beta&t=bfuBfluSLCyDRz-MwouxGMnQMyK0amctOnbuAn2Epfg" 
          nome="UFPR" 
          descricao="Pesquisadora em evolução de anuros, associada ao Laboratório de Dinâmicas Evolutivas." 
        />
        
        <CardGrande 
          imagem="https://play-lh.googleusercontent.com/I-GhNv3iV4ACK9Ucwq-rw93gytfb9Sxycs9iDz5dLoVhxs7lcueG7W_4bp-CvrFUYn2G" 
          nome="Loggi" 
          descricao="Desenvolvedora Iniciante. Estudo bastante e debugo meus próprios códigos." 
        />
      </div>

      <div className="page-section-container">
        <h2>Minhas redes sociais</h2>
        <ImagemButton 
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
          texto="Facebook" 
        />        

        <ImagemButton 
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png" 
          texto="Twitter" 
        />        
      </div>
    </div>
  );
}

export default App;
