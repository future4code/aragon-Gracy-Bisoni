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
app.post("/users", (req: Request, res: Response) => {
    try {
        const { name, email, age } = req.body
        let role = req.body.role as string

        if (!name || !email || !age || !role) {
            throw new Error("Missing data in body to create user")
        }

        if (typeof name !== "string") {
            throw new Error("Invalid name")
        }

        if (typeof email !== "string") {
            throw new Error("Invalid email")
        }

        if (typeof age !== "number") {
            throw new Error("Invalid age")
        }

        role = role.toUpperCase()
        if (!(role in USER_ROLE)) {
            throw new Error("Invalid type")
        }

        users.forEach(user => {
            if (user.email === email) {
                throw new Error("Email already exists")
            }
        })

        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            age,
            role: role === USER_ROLE.NORMAL
                ? USER_ROLE.NORMAL
                : USER_ROLE.ADMIN
        }

        users.push(newUser)

        res.status(201).send({
            message: "User created successfully",
            user: newUser,
            users: users
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Exercício 4
app.put("/users/:id", (req: Request, res: Response) => {
   try {
       const id = Number(req.params.id)
       const {email} = req.body
       let errorCode:number = 400

       if (!id){
           errorCode = 422;
           throw new Error("ID is required");
       }

       if(!email){
           errorCode = 422;
           throw new Error("Email is required");           
       }

       if(typeof email !== 'string' || typeof id !== 'number'){
           errorCode = 422;
           throw new Error("Invalid email or ID type");
       }

       const indexUser = users.findIndex((user)=> {
           return user.id === id
       })

       if(indexUser < 0){
           errorCode = 404
           throw new Error("User not found");
       }

       const indexEmail = users.findIndex((user)=> {
           return user.email === email
       })

       if(indexEmail>0){
           errorCode = 409;
           throw new Error("Email already exists");
       }

       users[indexUser].email = email;

       res.status(200).send({
           message: "User has been modified!",
           user: users[indexUser]
       })
   } catch (error) {
       res.status(500).send({message: error.message})
   }
})

// Exercício 5


app.listen(3003, () => console.log('Server is running on port 3003.'))

