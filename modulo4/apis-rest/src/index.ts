import express, { Request, Response } from 'express'
import cors from 'cors'
import { USER_ROLE, User, users } from './data'

const app = express()
app.use(cors())
app.use(express.json())

// Exercício 1

// Exercício 2
app.get('/users', (req: Request, res: Response) => {
    try {
        let role = req.query.role as string
        // let search = req.query.search as string

        if (role) {
            role = role.toUpperCase()
            if (role in USER_ROLE) {
                const result = users.filter((user) => user.role === role)
                return res.status(200).send(result)
            } else {
                throw new Error('Invalid type')
            }
        }

        // if (search) {
        //     const result = users.filter((user) => {
        //         user.name.includes(search)
        //     })

        //     console.log(result, search)
            
        //     if (result.length === 0) {
        //         return res.status(204).send("No user was found")
        //       }
              
        //       return res.status(200).send(result)
        // }

        res.status(200).send(users)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Exercício 3
app.post('/users', (req: Request, res: Response)=> {
    try {
        const {name, email, role, age} = req.body
        if (name && email && role && age) {
            if(typeof name === 'string' && typeof email === 'string'){
                if(typeof age === 'number'){
                    
                }
            }
        } else {
            throw new Error("Insert name, email, role and age");
            
        }
    } catch (error) {
        
    }
})
app.listen(3003, ()=> console.log('Server is running on port 3003.'))

