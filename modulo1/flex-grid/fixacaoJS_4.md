``` function contaOcorrencias(arrayDeNumeros, numeroEscolhido) {
  const quantoAparece=[]
  for (let i=0; i < arrayDeNumeros.length; i++){
    let posicaoAtual = arrayDeNumeros[i]
    if (posicaoAtual === numeroEscolhido){
      quantoAparece.push(posicaoAtual)
    } 
  }
  
  if (quantoAparece.length !==0){
      let frase =`O número ${numeroEscolhido} aparece ${quantoAparece.length}x`
      return frase
  } else{
    return `Número não encontrado`
  }
}
```