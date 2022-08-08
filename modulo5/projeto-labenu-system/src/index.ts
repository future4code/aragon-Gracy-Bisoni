import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getClassrooms } from './endpoints/Classrooms/getClassrooms'
import { getActiveClasses } from './endpoints/Classrooms/getActiveClasses'
import { createClass } from './endpoints/Classrooms/createClass'
import { updateClassModule } from './endpoints/Classrooms/updateClassModule'
import { updateStudentClass } from './endpoints/Students/updateStudentClass'
import { getClassStudents } from './endpoints/Classrooms/getClassStudents'
import { insertStudent } from './endpoints/Students/insertStudent'
import { getStudents } from './endpoints/Students/getStudents'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

// Endpoint 1 - Create Class
app.post('/classrooms', createClass)

// Endpoint extra - GET (all)CLASSROOMS
app.get('/classrooms', getClassrooms)

// Endpoint 2 - Get Active Classes
app.get('/classrooms/active', getActiveClasses)

// Endpoint 3 - Change class module - PUT
app.put('/classrooms/:id', updateClassModule)

// Endpoint 4 - Insert Student
app.post('/students', insertStudent)

// Endpoint 5 - GET (all)STUDENTS -> or add query "search" and name
app.get('/students', getStudents)

// Endpoint 6 - Update student - PUT
app.put('/students/:id', updateStudentClass)

// Endpoint 7 - Get class students
app.get('/classrooms/:classroomId/students', getClassStudents)


app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})