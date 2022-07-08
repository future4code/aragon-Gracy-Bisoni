import express, { Response, Request } from "express";
import cors from 'cors'
import { users  } from "./data";
import { User, Transaction } from './types'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/users', (req:Request, res:Response)=> {
    let errorCode = 400
    try {
        const { name, CPF, birth_date } = req.body
        const age:number = new Date().get
        if(!name || !CPF || !birth_date){
            errorCode = 422
            throw new Error("Insert name, CPF and birth date.");
            
        }
        users.push({
            name,
            CPF, 
            birth_date, 
            balance:0,
            statement:[]  
        })

        res.status(201).send({
            message: 'Account created!',
            users: users
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

app.get('/users', (req: Request, res:Response)=>{
    try {
        if(!users.length){
            res.statusCode = 404
            throw new Error('No accounts found');
        }
        res.status(200).send({
            users: users
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})





app.listen(3003, ()=> console.log ('Server is running on port 3003.'))