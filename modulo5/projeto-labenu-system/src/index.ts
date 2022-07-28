import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getStudents } from './endpoints/getStudents'
import { getClassrooms } from './endpoints/getClassrooms'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

// Endpoint 1 - Create Class

// Endpoint 2 - GET (all)CLASSROOMS -> falta selecionar só as ativas
app.get('/classrooms', getClassrooms)

// Endpoint 3 - Change class module - PUT

// Endpoint 4 - Insert Student

// Endpoint 5 - GET (all)STUDENTS -> or add query "search" and name
app.get('/students', getStudents)

// Endpoint 6 - Edit student - PUT

// Endpoint 7 - Get class students



app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})