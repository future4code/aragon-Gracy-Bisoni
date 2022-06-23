const primeiraArray = [
    {nome: "Leona"},
    {nome: "Isabelle"},
    {nome: "Caetano"}
]

const segundaArray = [
    {nome: "Caetano"},
    {nome: "Hórus"}
]

const geraItensUnicos = (primeiraArray, segundaArray) => {
    const novaArray = primeiraArray.concat(segundaArray)
    const arrayFinal = []
    novaArray.forEach(element => {
        let repetido = arrayFinal.findIndex(item => {
            return element.nome === item.nome
        }) > -1
        if(!repetido){
            arrayFinal.push(element)
        }
    });
    return arrayFinal   
}

console.log(geraItensUnicos(primeiraArray,segundaArray))

