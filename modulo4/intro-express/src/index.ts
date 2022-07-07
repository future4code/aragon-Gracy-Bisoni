import express, { Request, Response } from 'express'
import cors from 'cors'

// atribui a variável app as funcionalidades da biblioteca express
const app = express()

// setando configurações cors, troca de informação do back end e front end em clients diversificados
app.use(cors())

// recebe informação do front end, tô dizendo que ela vem na forma .json
app.use(express.json())


// Criação de endpoints
// uso o método da requisição passando dois parâmetros: o caminho e a callback do que será feito com a requisição
// a callback, por sua vez, recebe a requisição e a resposta, respectivamente

// EXERCÍCIO 1:
app.get('/', (req: Request, res: Response) => {
    res.send("Servidor funcionando!")
})

// EXERCÍCIO 2:
type User = {
    id: number,
    name: string,
    phone: number,
    email: string
}

const usersList: User[] = [
    {
        id: 1,
        name: 'Isa',
        phone: 992143194,
        email: 'isa@teste.com'
    },
    {
        id: 2,
        name: 'Leona',
        phone: 991139995,
        email: 'leona@teste.com'
    },
    {
        id: 3,
        name: 'Ana',
        phone: 991109345,
        email: 'ana@teste.com'
    }
]

// Exercício 3
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(usersList)
})

// Exercício 4
app.get('/users/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = usersList.filter((user) => {
        return user.id === id
    })

    res.status(200).send(user)
})

// Exercício 5
app.put('/users/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { phone } = req.body

    const newPhone = usersList.map((user) => {
        if (user.id === id) {
            user.phone = phone
            return user
        }
    })

    res.status(200).send({ message: 'Phone number updated!', user: newPhone[id - 1] })
})

// Exercício 6
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)

    //procurar o index do usuário na lista
    const index = usersList.findIndex((user) => {
        user.id === id
    })
    //deletar o usuário através do index
    usersList.splice(index, 1)

    res.status(200).send({message:'The user was deleted!', updatedList: usersList})


})

// recebe dois parâmetros, a porta (3003 por convenção, ou a porta de onde o servidor vai ser hospedado)
// e uma função callback, com o que eu quero q o app faça
app.listen(3003, () => console.log("O servidor está rodando na porta 3003."))