// Interpretação de código
// 1. (a) "Matheus Nachtergaele; "Denise Fraga"; Canal Brasil, 19h
// 2. (a) Juca, 3, SRD; Juba, 3, SRD; Jubo, 3, SRD
// (b) Copia o objeto citado.
// 3. (a) false; undefined. (b) porque não existe nenhuma propriedade altura no objeto "pessoa".

// Escrita de código
// ----------------- Exercício 1 --------------------
// (a)
const pessoa = {
    nome: `Isabelle`,
    apelidos: ["Isa", "Belle", "Daru"]
}

function imprimeObjeto (objeto) {
    const frase = `Eu sou ${objeto.nome}, mas pode me chamar de ${objeto.apelidos[0]}, ${objeto.apelidos[1]}, ${objeto.apelidos[2]}`
    return console.log(frase)
}
imprimeObjeto(pessoa)

// (b)
const maisApelidos = {...pessoa, apelidos:["Isinha", "Mamãe Isa", "Ziza"]}

imprimeObjeto(maisApelidos)

// ----------------- Exercício 2 --------------------
// (a)
const objeto1 = {
    nome:`Isabelle`,
    idade: 24,
    profissao: "dev iniciante"
}

const objeto2 ={
    nome:`Leona`,
    idade: 24,
    profissao:`dev`
}

// (b)
function array (objeto) {
const array = [objeto.nome,objeto.nome.length, objeto.idade, objeto.profissao, objeto.profissao.length]
return console.log(array)
}
array(objeto1)
array(objeto2)

// ----------------- Exercício 3 --------------------
// (a)
const carrinho = []

// (b)
const fruta1 = {
    nome: "banana",
    disponibilidade: true
}
const fruta2 = {
    nome: "morango",
    disponibilidade: true
}
const fruta3 ={
    nome:"manga",
    disponibilidade: true
}

// (c)
function encheCarrinho (objeto) {
    const adicionar = carrinho.push(objeto)
    return carrinho
}
encheCarrinho(fruta1)
encheCarrinho(fruta2)
encheCarrinho(fruta3)

//(d)
console.log(carrinho)