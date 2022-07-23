import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ping } from './endpoints/ping'
import { createUser } from './endpoints/createUser'
import { getUsers } from './endpoints/getUsers'
import { insertProduct } from './endpoints/insertProduct'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get("/ping", ping)

// Endpoint 1
app.post('/users', createUser)

// Endpoint 2
app.get('/users', getUsers)

// Endpoint 3
app.post('/products', insertProduct)