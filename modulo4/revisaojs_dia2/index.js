const clients = [
	{ id: 1, nome: "Fulano" },
	{ id: 2, nome: "Ciclano" },
	{ id: 3, nome: "Beltrano" },
	{ id: 4, nome: "Fulana" }
]

const signUpClients = (client) => {

    const idExist = clients.findIndex(val => val.id === client.id)

    if (typeof client.id === 'number' && typeof client.nome === 'string' && idExist < 0) {
            clients.push(client)
            return clients
        }else {
            return "Erro! Parâmetro inválido"
        }
}

console.log(signUpClients({id: 5, nome: "Isabelle"}))
console.log(signUpClients({id: 5, nome: "Leona"}))
console.log(signUpClients({id: 6, nome: "Leona"}))
console.log(signUpClients({id:"cinco", nome:"Isabelle"}))
console.log(signUpClients({id: 7, nome: 9}))


const geraTabuada = (numero) => {
    let tabuada = []
    for(var i=0; i <= 10; i++){
        tabuada.push(`${numero} x ${i} = ${numero*i}`)
        return tabuada
    }
}

console.log(geraTabuada(3))