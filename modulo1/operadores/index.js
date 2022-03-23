//Interpretação de código
//1. a. false, b.false, c.false, d.boolean
//2. O comando prompt sempre armazena a variável na forma de string, e não é possível fazer a soma de strings. 
//Antes disso, precisa ser colocado um "Number()" para conversão do valor recebido em número. Em seguida é possível realizar a operação.
//Da forma que foi colocado, o resultado será "primeiroNumerosegundoNumero", a impressão da concatenação das duas strings recebidas.


//--------------- Exercício 1 ----------------------
let idade = Number(prompt("Qual é sua idade?"))
let idadeAmigo = Number(prompt("Qual a idade do seu melhor amigue?"))
let isIdadeMaior = idade > idadeAmigo
let diferencaIdade = idade - idadeAmigo
console.log ("Sua idade é maior que a de seu amigue?", isIdadeMaior)
console.log ("Sua diferença de idade é", diferencaIdade,"anos")


//----------------- Exercício 2 ---------------------
let numPar = Number(prompt("Insira um número par"))
console.log(numPar % 2)
//A resposta será sempre zero, porque não há resto em uma divisão por 2 de um número par
//Se for inserido um número ímpar, tem resto.


//------------------ Exercício 3 --------------------
let idadeAnos = Number(prompt("Quantos anos você tem?"))
let idadeMeses = idadeAnos*12
let idadeDias = idadeAnos*365
let idadeHoras = idadeDias*24
console.log("Sua idade é equivalente a", idadeMeses,"meses")
console.log("Sua idade é equivalente a", idadeDias, "dias")
console.log("Sua idade é equivalente a", idadeHoras,"horas")


//------------------ Exercício 4 ---------------------
let n1 = Number(prompt("Coloque um número aqui"))
let n2 = Number(prompt("Agora mais um, por gentileza"))

let comp1 = n1 > n2
let comp2 = n1 === n2
let comp3 = n1 % n2
let comp4 = n2 % n1
let divisivel3 = comp3 === 0
let divisivel4 = comp4 === 0
console.log ("O primeiro número é maior que o segundo", comp1)
console.log ("O primeiro número é igual ao segundo", comp2)
console.log ("O primeiro número é divisível pelo segundo", divisivel3)
console.log ("O segundo número é divisível pelo primeiro", divisivel4)

//------------------ Desafio 1 ----------------------
//(a)
let nA = 77
let cKelvin = (nA - 32) * (5/9) + 273.15
console.log("O valor de",nA,"F é igual a",cKelvin,"K")

