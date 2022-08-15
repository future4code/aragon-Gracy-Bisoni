import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { PingController } from './controller/PingController'
import { UserController } from './controller/UserController'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const pingController = new PingController()

app.get("/ping", pingController.ping)

// Endpoint 1

const userController = new UserController()

app.post('/users', userController.signup)

// Endpoint 2
app.post("/login", userController.login)

// Endpoint 3
app.get("/users", userController.getAllUsers)

// Endpoint 4
app.put('/users', userController.updateUser)

// Endpoint 5
app.delete('/users', userController.deleteUser)
