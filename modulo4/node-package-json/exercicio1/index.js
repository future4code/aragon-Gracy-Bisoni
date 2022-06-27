//(a) usando process.argv

//(b) 
// const retornaFrase = (nome, idade) => {
//     const frase = `Olá, ${nome}! Você tem ${Number(idade)} anos!`
//     return console.log(frase)
// }
// retornaFrase(process.argv[2], process.argv[3])

//(c)
const retornaFrase = (nome, idade) => {
    const novaIdade = Number(idade)+7
    const frase = `Olá, ${nome}! Você tem ${Number(idade)} anos! Em sete anos você terá ${novaIdade}.`
    return console.log(frase)
}
retornaFrase(process.argv[2], process.argv[3])