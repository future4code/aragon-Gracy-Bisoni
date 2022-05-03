import React from 'react'
import styled from 'styled-components'

import {IconeComContador} from '../IconeComContador/IconeComContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'

const PostContainer = styled.div`
  border: 1px solid gray;
  width: 300px;
  margin-bottom: 10px;
`

const PostHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`

const PostFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`

const UserPhoto = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
`

const PostPhoto = styled.img`
  width: 100%;
`

class Post extends React.Component {
  // Aqui o declaramos o estado inicial de variáveis lábeis, 
  //através de um objeto
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0
  }

  // Em seguida, adicionam-se os métodos para retorno da interação do usuário
  // ATENÇÃO NA FUNÇÃO ´this.setState´ -> muda o estado AUTOMATICAMENTE

  //onClickCurtida: referente a ação de curtir
  // inicialmente dispara um console.log ("curtiu!"), mas eu modifiquei
  onClickCurtida = () => {
    
    this.setState({curtido: !this.state.curtido});
    
    if(!this.state.curtido) {
      this.state.iconeCurtida = iconeCoracaoPreto
      this.setState({numeroCurtidas: this.state.numeroCurtidas + 1});
    } else {
      this.state.iconeCurtida = iconeCoracaoBranco
      this.setState({numeroCurtidas: this.state.numeroCurtidas - 1});
    }

  }


  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    })
  }

  aoEnviarComentario = () => {
    this.setState({
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }

  //AGORA A TELA VAI RENDERIZAR A IMAGEM *CONDICIONALMENTE* AO *ESTADO*
  render() {
    let iconeCurtida

    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }

    let componenteComentario

    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }

    // Por fim, aqui você estrutura o componente "Post" com Styled Components
    // declarados lá em cima (partes em verde aqui embaixo)
    return <PostContainer>
      <PostHeader>
        <UserPhoto src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </PostHeader>

      <PostPhoto src={this.props.fotoPost} alt={'Imagem do post'}/>

      <PostFooter>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={this.onClickComentario}
          valorContador={this.state.numeroComentarios}
        />
      </PostFooter>
      {componenteComentario}
    </PostContainer>
  }
}

export default Post