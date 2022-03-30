// Interpretação de código
// 1. (a) Ele testa se o número colocado pelo usuário é par ou não.
// (b) pares
// (c) ímpares

// 2. (a) Para que o consumidor pesquise o preço de algumas frutas.
// (b) "O preço da fruta Maçã é de R$ 2,25"
// (c) "O preço da fruta Pêra é de R$ 5", porque a leitura da condição não foi correta, não houve a quebra do bloco de função e por isso continuou a leitura até o default, indicando um valor incorreto.

// 3. (a) Pedindo ao usuário que digite um número e transformando a string 
// de retorno em uma variável tipo Number.
// (b) Se 10 - "Esse número passou no teste", "Essa mensagem é secreta"; Se -10, dará erro.
// (c) No caso de -10 sim, porque não haverá nenhuma impressão, já que o número não passou no teste da condicional, e a mensagem está dentro do escopo dela. Além disso, não foi configurada nenhuma outra condição com números inferiores a 0.

// Escrita de código
// -------------- Exercício 1 ------------
const idade = Number(prompt("Quantos anos você tem?"))

function checaIdadeDirigir (idade){
if (idade > 18){
    return console.log(`Você pode dirigir`)
} else {
    return console.log(`Você não pode dirigir`)
}
}
checaIdadeDirigir(idade)

// -------------- Exercício 2 ------------
// function saudacaoTurno (string){
//     const stringMaiuscula = string.toUpperCase()
// if (stringMaiuscula === "M") {
//     return console.log("Bom dia!")
// }
// else if (stringMaiuscula === "V"){
//     return console.log("Boa tarde!")
// }
// else (stringMaiuscula === "N"); {
//     return console.log("Boa noite!")
// }
// }

// const turno = prompt(`Você estuda em qual turno? (M/V/N)`)
// saudacaoTurno(turno)

// -------------- Exercício 3 ------------
function saudacaoTurno (string){
    const stringMaiuscula = string.toUpperCase()
    switch (stringMaiuscula){
        case "M":
            console.log ("Bom dia!")
            break
        case "V":
            console.log("Boa tarde!")
            break
        case "N":
            console.log("Boa noite!")
    }
}
const turno = prompt(`Você estuda em qual turno? (M/V/N)`)
saudacaoTurno(turno)

// -------------- Exercício 4 ------------
function vaiRolarCinema (isFantasia,isCheap){
    if (isFantasia && isCheap){
        return console.log ("Bom filme!")
    }
    else {
        return console.log("Escolha outro filme")
    }
    }


let generoFilme = prompt(`Qual o gênero de filme que vamos assistir?`)
let precoIngresso = Number(prompt(`Qual o valor do ingresso?(apenas números)`))

if (generoFilme === "fantasia"){
    generoFilme = true
} else {
    generoFilme = false
}

if (precoIngresso < 15){
    precoIngresso = true
} else{
    precoIngresso = false
}

vaiRolarCinema(generoFilme,precoIngresso)