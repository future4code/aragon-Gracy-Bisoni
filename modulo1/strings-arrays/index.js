//Interpretação de código
//1. a)undefined, b)null, c)11 d)3, e)19, f)9
//2. "SUBI NUM ONIBUS EM MIRROCOS", 27


//Escrita de código
//--------------------- Exercício 1 -----------------------
let eMail = prompt("Qual o seu melhor e-mail?")
let nomeDoUsuario = prompt ("Defina um nome de usuário")
const resposta = `O e-mail ${eMail} foi cadastrado com sucesso. Seja bem vinde, ${nomeDoUsuario}!`
console.log (resposta)


//--------------------- Exercício 2 ----------------------
const rangos = ["Lasanha 4 queijos", "Abobrinha frita", "Escondidinho de brócolis", "Pasta de amendoim com geleia", "Torta banoffe"]
console.log (rangos)

console.log("Essas são minhas comidas favoritas:")
console.log(rangos[0])
console.log(rangos[1])
console.log(rangos[2])
console.log(rangos[3])
console.log(rangos[4])
let notMyFav = prompt("Qual é sua comida favorita?")
rangos [1] = notMyFav
console.log(rangos)


//--------------------- Exercício 3 ---------------------
const listaDeTarefas = []
listaDeTarefas.push(prompt("Liste 3 tarefas que tem no seu dia hoje. Tarefa 1:"))
listaDeTarefas.push(prompt("Tarefa 2"))
listaDeTarefas.push(prompt ("Tarefa 3"))
console.log(listaDeTarefas)
let tarefaFeita = Number(prompt("Indique o índice (0,1 ou 2) da tarefa que você já completou"))
listaDeTarefas.splice(tarefaFeita,1)
console.log(listaDeTarefas)


//--------------------- Desafio 1 ------------------------
let frase = prompt("Escreva uma frase qualquer")
const testeArray = frase.split (" ")
console.log(testeArray)

//--------------------- Desafio 2 ------------------------
let frutas = ["Banana", "Morango", "Abacaxi", "Laranja", "Ameixa"]
console.log(frutas)
let kdAbacaxi = frutas.lastIndexOf("Abacaxi")
console.log(`O índice da palavra "Abacaxi" na array é ${kdAbacaxi}`)
let tamanho = frutas.length
console.log(`A array "frutas" possui ${tamanho} itens`)