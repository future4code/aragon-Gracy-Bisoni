// EXEMPLOS DE IMPLEMENTAÇÃO ---------------------------------------------------------------

// EXERCÍCIO 0A
function soma(num1, num2) {
  // implemente sua lógica aqui
  return num1 + num2
}

// EXERCÍCIO 0B
function imprimeMensagem() {
  // implemente sua lógica aqui
  const mensagem = prompt('Digite uma mensagem!')

  console.log(mensagem)
}

// EXERCÍCIOS PARA FAZER ------------------------------------------------------------------

// EXERCÍCIO 01
function calculaAreaRetangulo() {
  // implemente sua lógica aqui
let altura = Number(prompt(`Digite a altura de um retângulo`))
let largura = Number(prompt(`Digite a largura do retângulo`))
let areaRetangulo = altura*largura
return console.log (areaRetangulo)
}

// EXERCÍCIO 02
function imprimeIdade() {
  // implemente sua lógica aqui
let anoAtual = Number(prompt(`Insira seu ano atual`))
let anoNascimento = Number(prompt(`Agora o seu ano de nascimento`))
let idade = anoAtual - anoNascimento
return console.log(idade)
}

// EXERCÍCIO 03
function calculaIMC(peso, altura) {
  // implemente sua lógica aqui
  let alturaQuadrado = altura*altura
let imc = peso / alturaQuadrado
return imc
}


// EXERCÍCIO 04
function imprimeInformacoesUsuario() {
  // implemente sua lógica aqui
  // "Meu nome é NOME, tenho IDADE anos, e o meu email é EMAIL."
let nome = prompt(`Qual é o seu nome?`)
let idade = Number(prompt(`Qual é a sua idade?`))
let email = prompt(`Qual é seu e-mail?`)
return console.log(`Meu nome é ${nome}, tenho ${idade} anos, e o meu email é ${email}.`)
}

// EXERCÍCIO 05
function imprimeTresCoresFavoritas() {
  // implemente sua lógica aqui
let corFav1 = prompt(`Preciso de 3 de suas cores prediletas. Uma aqui:`)
let corFav2 = prompt(`Mais uma`)
let corFav3 = prompt(`E a última, por gentileza`)
const coresFavoritas = [corFav1, corFav2, corFav3]
return console.log (coresFavoritas)
}

// EXERCÍCIO 06
function retornaStringEmMaiuscula(string) {
  // implemente sua lógica aqui
let stringMaiuscula = string.toUpperCase()
return stringMaiuscula
}

// EXERCÍCIO 07
function calculaIngressosEspetaculo(custo, valorIngresso) {
  // implemente sua lógica aqui
let cobreCustos = custo/valorIngresso
return cobreCustos
}

// EXERCÍCIO 08
function checaStringsMesmoTamanho(string1, string2) {
  // implemente sua lógica aqui
let tamanhoString1 = string1.length
let tamanhoString2 = string2.length
let checagem = tamanhoString1 === tamanhoString2
return checagem
}

// EXERCÍCIO 09
function retornaPrimeiroElemento(array) {
  // implemente sua lógica aqui
return array[0]
}

// EXERCÍCIO 10
function retornaUltimoElemento(array) {
  // implemente sua lógica aqui
return array.pop()
}

// EXERCÍCIO 11
function trocaPrimeiroEUltimo(array) {
  // implemente sua lógica aqui
let ultimoElemento = array.pop()
let primeiroElemento = array.splice(0,1)
array.push(primeiroElemento)
array[0] = ultimoElemento
return array
}

// EXERCÍCIO 12
function checaIgualdadeDesconsiderandoCase(string1, string2) {
  // implemente sua lógica aqui
let minusculaString1 = string1.toLowerCase()
let minusculaString2 = string2.toLowerCase()
let comparacao = minusculaString1 === minusculaString2
return comparacao
}

// EXERCÍCIO 13
function checaRenovacaoRG() {
  // implemente sua lógica aqui
const anoAtual = Number(prompt(`Qual é seu ano atual?`))
const anoNascimento = Number(prompt(`Agora, em que ano você nasceu?`))
const emissaoRG = Number(prompt(`E em qual ano foi emitido seu RG?`))

const idade = anoAtual - anoNascimento
const tempoRG = anoAtual - emissaoRG

const comparacao1 = idade <= 20 && tempoRG >= 5
const comparacao2 = idade > 20 && idade <=50 && tempoRG >=10
const comparacao3 = idade > 50 && tempoRG >= 15
let renovar = comparacao1 || comparacao2 || comparacao3
console.log(renovar)
return renovar
}

// EXERCÍCIO 14
function checaAnoBissexto(ano) {
  // implemente sua lógica aqui
const divide400 = ano % 400
let multiplo400 = divide400 === 0

const divide4 = ano % 4
let multiplo4 = divide4 === 0
let divide100 = ano%100 
let diferente = divide100 !== 0
let condicao2 = multiplo4 && diferente

let bissexto = multiplo400 || condicao2
console.log(bissexto)
return bissexto
}

// EXERCÍCIO 15
function checaValidadeInscricaoLabenu() {
  // implemente sua lógica aqui
const maiorDeIdade = prompt(`Você tem mais de 18 anos?`)
maiorDeIdade.toLowerCase()
const ensinoMedio = prompt(`Você possui ensino médio completo?`)
ensinoMedio.toLowerCase()
const disponibilidade =  prompt (`Você possui disponibilidade exclusiva durante os horários do curso?`)
disponibilidade.toLowerCase()

let taOK = maiorDeIdade === ensinoMedio === disponibilidade
console.log(taOK)
return taOK
}