// Exercício 1 
let ano:string | number = '1997'
ano = 2003

console.log(ano)
// usando o operador "|" na tipagem, eu posso atribuir mais de um tipo de valor possível a variável

// Exercício 2
type pessoa = {
    nome: string
    idade: number
    corFavorita: string
}

const eu:pessoa = {
    nome: 'Belle',
    idade: 24,
    corFavorita:'lilás'
}

console.log(eu)