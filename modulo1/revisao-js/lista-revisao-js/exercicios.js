// ATENÇÃO!!!
//    -> NÃO COMENTE NENHUMA DAS FUNÇÕES DECLARADAS!!! 
//    -> NÃO MODIFIQUE OS PARÂMETROS DAS FUNÇÕES!!! ()


// EXERCÍCIO 01
function retornaTamanhoArray(array) {
   return array.length
}
retornaTamanhoArray()

// EXERCÍCIO 02
function retornaArrayInvertido(array) {
return array.reverse()
}
retornaArrayInvertido()


// EXERCÍCIO 03
function retornaArrayOrdenado(array) {
  let arrayOrdenado = array.sort((a,b) => a-b)
  return arrayOrdenado
}
retornaArrayOrdenado()

// EXERCÍCIO 04
function retornaNumerosPares(array) {
const novaArray = array.filter((numero) => {
    return numero%2 === 0
})
return novaArray
}
retornaNumerosPares()


// EXERCÍCIO 05
function retornaNumerosParesElevadosADois(array) {
const numerosPares = array.filter((numero) => {
        return numero % 2 === 0
    })
const numerosParesElevadosAoQuadrado = numerosPares.map((numero) => {
        return numero * numero
    })
    return numerosParesElevadosAoQuadrado
}
retornaNumerosParesElevadosADois()

// EXERCÍCIO 06
function retornaMaiorNumero(array) {
  let maiorNumero = -Infinity
  for (let i=0; i< array.length; i++){
      let posicaoAtualArray = array[i]
      if (posicaoAtualArray >= maiorNumero){
          maiorNumero = posicaoAtualArray
      }
  } return maiorNumero
}
retornaMaiorNumero()

// EXERCÍCIO 07
let maiorNumero = -Infinity
let menorNumero = Infinity
function retornaObjetoEntreDoisNumeros(num1, num2) {
    let maiorNumero = -Infinity
    let menorNumero = Infinity
    if (num1 >= num2){
    maiorNumero =+ num1
    menorNumero =+ num2
    } else if (num2 >= num1){
        maiorNumero =+ num2
        menorNumero =+ num1 
    } 
    const objeto = 
    {maiorNumero: maiorNumero,
     maiorDivisivelPorMenor: maiorNumero%menorNumero === 0,
     diferenca: maiorNumero-menorNumero}
    return objeto
}
retornaObjetoEntreDoisNumeros()

// EXERCÍCIO 08
function retornaNPrimeirosPares(n) {
   
}

// EXERCÍCIO 09
function classificaTriangulo(ladoA, ladoB, ladoC) {

}

// EXERCÍCIO 10
function retornaSegundoMaiorESegundoMenor(array) {
  
}

// EXERCÍCIO 11
function retornaChamadaDeFilme(filme) {
   
}

// EXERCÍCIO 12
function retornaPessoaAnonimizada(pessoa) {
   
}

// EXERCÍCIO 13A
function retornaPessoasAutorizadas(pessoas) {
   
}

// EXERCÍCIO 13B
function retornaPessoasNaoAutorizadas(pessoas) {
  
}

// EXERCÍCIO 14
function retornaContasComSaldoAtualizado(contas) {

}

// EXERCÍCIO 15A
function retornaArrayOrdenadoAlfabeticamente(consultas) {
  
}

// EXERCÍCIO 15B
function retornaArrayOrdenadoPorData(consultas) {
   
}