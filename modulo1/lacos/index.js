// Interpretação de código
// 1. Incrementando 0-4 na variável valor, reatribuindo-a até que o i seja 5.
// 2. (a) Todos os números da string que tiverem valor maior de 18.
// (b) 
// 3. *,**,***,****; um em cada linha. Dando o comando "4" o console.log imprimirá uma linha contendo a informação

// Escrita de código
//------------------- Exercício 1 ------------------------
let numeroBichos = Number(prompt(`Quantos pets vc tem?`))
const listaPets =[]

    if (numeroBichos === 0){
    console.log(`Que pena! Você pode adotar um pet!`)

} else if (numeroBichos > 0){

    for (let i = 0; i < numeroBichos; i++){
        let nomesBichos = prompt (`Qual o nome do seu pet?`)
        listaPets.push(nomesBichos)

        console.log(listaPets)
    }

}
//------------------- Exercício 2 ------------------------
//(a) 
const array = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55]

function imprimeArray (){
    for (let num of array){
        console.log(num)
}
}
imprimeArray()

// (b)
function imprimeDivisao(){
for (i=0; i <= array.length -1; i++){
    let posicaoArray = array[i]
    let divisao = posicaoArray/10
    console.log(divisao)
}
}
imprimeDivisao()

//(c)
// let arrayNova = []
// let i = 0
// let posicaoArray = array[i]
// let dividirPar = posicaoArray%2 === 0

// function imprimePares(){
// while (posicaoArray <= array.length -1 )
    
//      if(dividirPar === true){
//          arrayNova.push(posicaoArray)
//      } else {

//      }
//  }
//  console.log(arrayNova)
// }
// imprimePares()