function blackJack (){
       console.log (`Boas vindas ao jogo de Blackjack!`)
       if (confirm(`Você deseja jogar?`)){
          let cartaJogador = {}
          let cartaComputador = {}
          let cartasJogador = []
          let cartasPC = []

         let pontuacaoJogador = 0
         let pontuacaoPC = 0

         for (i=0; i<2; i++){
           cartaJogador = comprarCarta()   
           cartaComputador = comprarCarta()
           cartasJogador.push(cartaJogador)
           cartasPC.push(cartaComputador)
           pontuacaoJogador += cartaJogador.valor
           pontuacaoPC += cartaComputador.valor
       } 
       if (pontuacaoJogador === pontuacaoPC){
         console.log (`Empate`)
      } else if (pontuacaoJogador > pontuacaoPC){
         console.log(`O usuário ganhou!`)
      } else if (pontuacaoPC > pontuacaoJogador){
         console.log(`O computador ganhou!`)
      }
       console.log(`Usuário - cartas: ${cartasJogador[0].texto}, ${cartasJogador[1].texto}, ${cartasJogador[0].valor}, ${cartasJogador[1].valor}  - pontuação ${pontuacaoJogador}`)
       console.log(`Computador - cartas: ${cartasPC[0].texto},${cartasPC[1].texto}, ${cartasPC[0].valor},${cartasPC[1].valor} - pontuação ${pontuacaoPC}`)

      } else {
          return console.log (`O jogo acabou`)
       }
    }

    blackJack()
