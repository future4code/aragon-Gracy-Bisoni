// ATENÇÃO!!!
//    -> NÃO COMENTE NENHUMA DAS FUNÇÕES DECLARADAS!!! 
//    -> NÃO MODIFIQUE OS PARÂMETROS DAS FUNÇÕES!!! ()


// EXERCÍCIO 01
function retornaTamanhoArray(array) {
   return array.length
}

// EXERCÍCIO 02
function retornaArrayInvertido(array) {
return array.reverse()
}


// EXERCÍCIO 03
function retornaArrayOrdenado(array) {
  let arrayOrdenado = array.sort((a,b) => a-b)
  return arrayOrdenado
}

// EXERCÍCIO 04
function retornaNumerosPares(array) {
const novaArray = array.filter((numero) => {
    return numero%2 === 0
})
return novaArray
}


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


// EXERCÍCIO 08
function retornaNPrimeirosPares(n) {
  let arrayPares = []
    for (i=0; i < n; i++){
    arrayPares.push(i*2);
   }
 return arrayPares
}

// EXERCÍCIO 09
function classificaTriangulo(ladoA, ladoB, ladoC) {
if (ladoA === ladoB && ladoB === ladoC && ladoA === ladoC){
    return "Equilátero"
} else if (ladoA !== ladoB && ladoB !== ladoC && ladoA !== ladoC){
    return "Escaleno"
} else{
    return "Isósceles"
}
}

// EXERCÍCIO 10
function retornaSegundoMaiorESegundoMenor(array) {
  let arrayOrdenado = array.sort((a,b) => a-b)
  
  let segundoMaior = arrayOrdenado[(arrayOrdenado.length-2)]
  let segundoMenor = arrayOrdenado[1]
  const novoArray = [segundoMaior,segundoMenor]
  return novoArray
}


// EXERCÍCIO 11
function retornaChamadaDeFilme(filme) {
let frase = `Venha assistir ao filme ${filme.nome}, de ${filme.ano}, dirigido por ${filme.diretor} e estrelado por ${filme.atores.join(", ")}.`
return frase
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