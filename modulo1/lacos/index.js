// Interpretação de código
// 1. Incrementando 0-4 na variável valor, reatribuindo-a até que o i seja 5.
// 2. (a) Todos os números da string que tiverem valor maior de 18.
// (b) Sim, colocando um "if" dentro para condição de imprimir o índice apenas de números maiores que 18.
// let i = 0
// const lista = [10, 11, 12, 15, 18, 19, 21, 23, 25, 27, 30]
// for (let num of lista) {

//   if (num > 18) {
// 		console.log(`Número ${num}, índice: ${i}`)
// 	}

//   i++
// }

// 3. *,**,***,****; um em cada linha. Dando o comando "4" o console.log imprimirá uma linha contendo a informação

// Escrita de código
//------------------- Exercício 1 ------------------------
// let numeroBichos = Number(prompt(`Quantos pets vc tem?`))
// const listaPets =[]

//     if (numeroBichos === 0){
//     console.log(`Que pena! Você pode adotar um pet!`)

// } else if (numeroBichos > 0){

//     for (let i = 0; i < numeroBichos; i++){
//         let nomesBichos = prompt (`Qual o nome do seu pet?`)
//         listaPets.push(nomesBichos)

//         console.log(listaPets)
//     }

// }
// //------------------- Exercício 2 ------------------------
// //(a) 
// const array = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55]

// function imprimeArray (){
//     for (let num of array){
//         console.log(num)
// }
// }
// imprimeArray()

// // (b)
// function imprimeDivisao(){
// for (i=0; i <= array.length -1; i++){
//     let posicaoArray = array[i]
//     let divisao = posicaoArray/10
//     console.log(divisao)
// }
// }
// imprimeDivisao()

// (c)
const array = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55]
// function pegaPares(array){
//  let arrayNova = []
//      for (let valor of array){
//           if (valor%2 === 0){
//         arrayNova.push(valor)
//     }
// }
// console.log(arrayNova)
// }
// pegaPares(array)

// (d)
// let arrayFrase = []
// let i=0
// function arrayString(num){
// for (let num of array){
//   arrayFrase.push(`o elemento do índice ${i} é ${num}`)
//   i++
// }
// console.log(arrayFrase)
// }
// arrayString(array)

// (e) 
function maiorEMenorNumero (num){
    let maiorNumero = 0
    let menorNumero = Infinity
    for (let i=0; i < array.length; i++){
        if (array [i] < menorNumero){
            menorNumero = array[i]
        } else if (array [i] > maiorNumero){
            maiorNumero = array [i]
        }
    }
console.log (`O menor número da array é ${menorNumero}`)
console.log(`O maior número da array é ${maiorNumero}`)
}
maiorEMenorNumero(array)