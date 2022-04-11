// Interpretação de código
// 1. [undefined, undefined, undefined]
// 2. ["Amanda Rangel", "Lais Petra", "Leticia Chijo"]
// 3. ["Mandi", "Laura"]

// Escrita de código
// 1.
const pets = [
    { nome: "Lupin", raca: "Salsicha"},
    { nome: "Polly", raca: "Lhasa Apso"},
    { nome: "Madame", raca: "Poodle"},
    { nome: "Quentinho", raca: "Salsicha"},
    { nome: "Fluffy", raca: "Poodle"},
    { nome: "Caramelo", raca: "Vira-lata"},
 ]
// (a)
const nomeDosPets = pets.map ((item) => {
    return item.nome
})

console.log (nomeDosPets)

// (b)
const cachorroSalsicha = pets.filter((item) => {
    if(item.raca ==="Salsicha"){
    return item.raca 
}
})
console.log(cachorroSalsicha)

// (c)
const dogPoodle = pets.filter((item) => {
       if (item.raca === "Poodle"){
           return console.log(`Você ganhou um cupom de desconto de 10% para tosar o/a ${item.nome}`)
       }
})

// 2. 
const produtos = [
    { nome: "Alface Lavada", categoria: "Hortifruti", preco: 2.5 },
    { nome: "Guaraná 2l", categoria: "Bebidas", preco: 7.8 },
    { nome: "Veja Multiuso", categoria: "Limpeza", preco: 12.6 },
    { nome: "Dúzia de Banana", categoria: "Hortifruti", preco: 5.7 },
    { nome: "Leite", categoria: "Bebidas", preco: 2.99 },
    { nome: "Cândida", categoria: "Limpeza", preco: 3.30 },
    { nome: "Detergente Ypê", categoria: "Limpeza", preco: 2.2 },
    { nome: "Vinho Tinto", categoria: "Bebidas", preco: 55 },
    { nome: "Berinjela kg", categoria: "Hortifruti", preco: 8.99 },
    { nome: "Sabão em Pó Ypê", categoria: "Limpeza", preco: 10.80 }
 ]

// (a)
const nomesDosProdutos = produtos.map ((item) =>{
    return console.log (item.nome)
})

// (b)
// const comDesconto = produtos.filter((item) => {
//  const precoNovo = produtos.map((item) => {
//      item.preco = (item.preco -(item.preco *0.05))
//      return item.preco
//  })
// const novoObjeto ={
//     nome: item.nome,
//     preco: item.preco.toFixed(2)
// }
// console.log(novoObjeto)
// })

// (c)
const soBebidas = produtos.filter ((item) =>{
    if (item.categoria === "Bebidas"){
        console.log (item)
    }
})

// (d)
const soYpe = produtos.filter ((item) => {
    const produtosYpe = item.nome.includes("Ypê")
    return produtosYpe
})
console.log(soYpe)

// (e)
const propaganda = soYpe.map ((item) => {
    return `Compre ${item.nome} por ${item.preco}`
})
console.log(propaganda)
