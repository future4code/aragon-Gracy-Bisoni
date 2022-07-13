import express, { Response, Request } from "express";
import cors from 'cors'
import { users } from "./data";
import { User, Transaction } from './types'

const app = express()
app.use(cors())
app.use(express.json())

// Cria usuário (Create new account)
app.post('/users', (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { name, CPF, birthDate } = req.body
        const indexCPF = users.findIndex(val => val.CPF === CPF)
        const birthDateSplit = birthDate.split('/')
        const nameSplit = name.split('')
        const currentYear = new Date().getFullYear()
        const age = currentYear - birthDateSplit[2]


        if (!name || !CPF || !birthDate) {
            res.statusCode = 422
            throw new Error("Insert name, CPF and birth date.");
        }

        if (typeof name !== 'string' || typeof CPF !== 'string' || typeof birthDate !== 'string') {
            res.statusCode = 422
            throw new Error("Name, CPF and birth date must be string type");
        }

        if (age < 18) {
            res.statusCode = 422
            throw new Error("User age must be over than 18 years old");
        }

        if (nameSplit.length < 3) {
            res.statusCode = 422
            throw new Error("User name must have at least 3 characters");
        }

        if (indexCPF < 0) {
            const newUser: User = {
                id: users.length + 1,
                name,
                CPF,
                birthDate,
                balance: 0,
                statement: []
            }

            users.push(newUser)
        } else {
            res.statusCode = 409
            throw new Error("CPF already exists");
        }

        res.status(201).send({
            message: 'Account created!',
            users: users
        })

    } catch (error) {
        console.log(error)
        res.status(res.statusCode).send(error.message)
    }
})

// Pega a lista de usuários (Get users list)
app.get('/users', (req: Request, res: Response) => {
    try {
        if (!users.length) {
            res.statusCode = 404
            throw new Error('No accounts found');
        }
        res.status(200).send({
            users: users
        })
    } catch (error) {
        res.status(res.statusCode).send(error.message)
    }
})

// Pega o saldo do usuário passado pelo path (Return balance of client informed by ID)
app.get('/users/balance/:id', (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const userIndex = users.findIndex(user => user.id === id)

        if (!id) {
            res.statusCode = 422
            throw new Error("Need to add a valid ID, number type");
        }

        if (userIndex < 0) {
            res.statusCode = 404
            throw new Error("User not found")
        }

        const result = users.filter((user) => {
            return user.id === id
        }).map((user) => {
            return user.balance
        })

        res.status(200).send({
            user: users[userIndex].name,
            balance: `R$${result},00`
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Adiciona um valor ao saldo (Add a value to balance)
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { balance } = req.body
        const userIndex = users.findIndex(user => user.id === id)

        if (!id || !balance) {
            res.statusCode = 422
            throw new Error("Insert a valid ID and balance value");
        }

        if (typeof balance !== 'number') {
            res.statusCode = 422
            throw new Error("Balance needs to be number type");
        } else if (balance <= 0) {
            res.statusCode = 422
            throw new Error("Balance value must be greater than zero");
        }

        if (userIndex < 0) {
            res.statusCode = 404
            throw new Error("User not found");
        } else {

            const result = users.filter((user) => {
                if (user.id === id) {
                    return user
                }
            }).map((user) => {
                user.balance += balance
                return user
            })

            res.status(200).send({
                message: "Success",
                newBalance: `R$ ${result[userIndex].balance},00`,
                user: result[userIndex]
            })
        }

    } catch (error) {
        res.status(res.statusCode).send(error.message)
    }
})

// Pay a bill
app.put('/users/:id/pay', (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { description, value } = req.body
        const userIndex = users.findIndex(user => user.id === id)
    
        function formatDate (){
            const dayString = new Date().getDate().toString()
            const currentDay = dayString.length === 1? '0'+dayString : dayString
            const monthString = new Date().getMonth().toString()
            const currentMonth = monthString.length === 1? '0'+monthString : monthString
            const currentYear = new Date().getFullYear().toString()

            const date = `${currentDay}/${currentMonth}/${currentYear}`

            return date
        }


        if (!value || !description || !id) {
            res.statusCode = 422
            throw new Error("Insert a valid ID, value and description");
        }

        if (typeof value !== "number") {
            res.statusCode = 422
            throw new Error("Value must be number type");
        }


        if (typeof description !== 'string') {
            res.statusCode = 422
            throw new Error("Description must be string type");
        } else {
            const descriptionSplit = description.split('')
            if (descriptionSplit.length < 6) {
                res.statusCode = 422
                throw new Error("Description must have at least 6 characters");
            }
        }

        if (userIndex < 0) {
            res.statusCode = 404
            throw new Error("User not found");
        } else {
            const newTransaction: Transaction = {
                value,
                description,
                date: formatDate(),
            }
            const result = users.map((user) => {
                if (user.id === id) {
                    if (user.balance < value) {
                        res.statusCode = 400;
                        throw new Error("Customer doesn't have enough balance");
                    } else {
                        user.balance -= value
                        user.statement.push(newTransaction)
                    }
                }
                return user
            }).filter((user) => {
                user.id === id
            })
            res.status(200).send({
                message: "You paid the bill successfully!",
                user: users[userIndex]
            })
        }

    } catch (err) {
        res.status(res.statusCode).send(err.message)
    }
})



app.listen(3003, () => console.log('Server is running on port 3003.'))