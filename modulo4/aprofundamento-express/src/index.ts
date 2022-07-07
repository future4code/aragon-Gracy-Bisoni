import express, {Request, Response} from 'express'
import cors from "cors"
import { ToDo, toDos } from './toDos'
import { escapeLeadingUnderscores } from 'typescript'

const app = express()
app.use(cors())
app.use(express.json())

// Exercício 1
app.get('/ping',(req:Request, res:Response)=> {
    res.status(200).send('Pong!')
})

// Exercício 2

// Exercício 3
// app.get('/todos/:userId', (req:Request, res:Response) => {
//     const userId = Number(req.params.userId)

//     const userToDos = toDos.filter((toDo)=> {
//         return toDo.userId === userId
//     });

//     res.status(200).send({
//         toDoList: userToDos
//     });
// })
app.get('/todos/:userId', (req: Request, res: Response)=> {
    try {
        const userId = Number(req.params.userId)
        const userToDos = toDos.filter((toDo)=> {
            return toDo.userId === userId
        })

        if(userToDos.length === 0){
            throw new Error('User not found')
        }
        res.status(200).send({
            toDoList: userToDos
        });

    } catch (error) {
        res.send({message: error.message})
    }
})

// Exercício 4
// app.post('/todos', (req: Request, res: Response)=> {
//     const { userId, title } = req.body

//     const lastToDo = toDos[toDos.length-1]
//     const newTask:ToDo = {
//         userId: userId,
//         id: lastToDo.id+1,
//         title: title,
//         completed: false
//     }

//     toDos.push(newTask)

//     res.status(200).send({
//         message: 'Your task was added to the list!',
//         addedTask: newTask,
//         toDoList: toDos
//     })
// })

app.post('/todos', (req: Request, res: Response)=> {
    try {
        const {userId, title} = req.body

        if(typeof userId === "string"){
            throw new Error("Error! Invalid ID type");
        }
        const newTask:ToDo = {
            userId: userId,
            id: Date.now(),
            title: title,
            completed: false
        }
        toDos.push(newTask)

        res.send({
            message:'success',
            tasks: toDos
        })
        
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

// Exercício 5
app.put('/todos/:id', (req:Request, res: Response)=> {
    const id = Number(req.params.id)
    const newList = toDos.map((toDo)=> {
        if (toDo.id === id){
          toDo.completed = !toDo.completed
        } 
        return toDo
    })

    console.log(newList)
    res.status(200).send({ message:'Task Status updated!', toDos: newList })
})

// Exercício 6
app.delete('/todos/:id', (req: Request, res: Response)=> {
    const id = Number(req.params.id)

    const newList = toDos.filter((toDo)=> {
        return toDo.id !== id
    })

    res.status(200).send({
        message: 'Task deleted successfully!',
        updatedList: newList
    })
})

// Exercício 7
app.get('/todos', (req: Request, res: Response)=> {
    const status = req.query.completed as string


    const filteredList = toDos.filter((toDo)=> {
        if(status !== undefined){
            return toDo.completed.toString() === status
        }
    })
    res.status(200).send({
        toDos: filteredList
    })
})





app.listen(3003, ()=> console.log('Servidor rodando na porta 3003'))