import express, { Response, Request } from "express";
import cors from 'cors'
import { users } from "./data";
import { User, Transaction } from './types'

const app = express()
app.use(cors())
app.use(express.json())

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
            const newUser:User= {
                id: users.length + 1,
                name,
                CPF,
                birthDate,
                balance: 0,
                statement: []
            }

            users.push(newUser)
        } else{
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

app.get('/users/balance/:id', (req: Request, res: Response)=> {
    try {
        const id = Number(req.params.id)
    const userIndex = users.findIndex(user => user.id === id)

    if(!id){
        res.statusCode = 422
        throw new Error("ID was not informed");
    }

    if(userIndex < 0){
        res.statusCode = 404
        throw new Error("User not found")
    }

    const result = users.filter((user)=> {
        return user.id === id
    }).map((user)=> {
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




app.listen(3003, () => console.log('Server is running on port 3003.'))