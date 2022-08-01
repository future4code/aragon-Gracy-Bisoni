import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { EDITABLE, User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const nickname = req.body.nickname
            const email = req.body.email
            const password = req.body.password

            if (!nickname || !email || !password) {
                throw new Error("Parâmetros faltando")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const user = new User(
                id,
                nickname,
                email,
                password
            )

            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(201).send({
                message: "Cadastro realizado com sucesso",
                token
            })
        } catch (error) {
            if (
                typeof error.message === "string"
                && error.message.includes("Duplicate entry")
            ) {
                return res.status(400).send("Email already taken")
            }
            res.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email || !password) {
                errorCode = 401
                throw new Error("Email ou senha faltando")
            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)

            if (!userDB) {
                errorCode = 401
                throw new Error("Email não foi cadastrado")
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password
            )

            if (user.getPassword() !== password) {
                errorCode = 401
                throw new Error("Senha inválida")
            }

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(200).send({
                message: "Login realizado com sucesso",
                token
            })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public getAllUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const search = req.query.search as string

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido")
            }

            const userDatabase = new UserDatabase()
            const searchUser = await userDatabase.searchUser(search)

            if (search) {
                const user = searchUser.map((user) => {
                    const result = {
                        id: user.id,
                        nickname: user.nickname,
                        email: user.email
                    }

                    return result
                })
                res.status(200).send({ user })

            } else {

                const usersDB = await userDatabase.getAllUsers()

                const users = usersDB.map((user) => {
                    const result = {
                        id: user.id,
                        nickname: user.nickname,
                        email: user.email
                    }
                    return result
                })

                res.status(200).send({ users })

            }
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { email, nickname, password } = req.body

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            const id = payload.id

            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido")
            }

            const userDatabase = new UserDatabase()
            const searchUser = await userDatabase.findUserById(id)

            if (!searchUser[0]) {
                errorCode = 404
                throw new Error("User not found");
            }

            if (!email && !nickname && !password) {
                errorCode = 400
                throw new Error("Missing params");

            }

            // FAZER OUTRAS VALIDAÇÕES!!!!!!!
            const result = await userDatabase.updateProfile(id, email, nickname, password)
            res.status(200).send({ message: "Success"})
        } catch (error) {
            res.status(errorCode).send(error.message)
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const id = req.body.id as string
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)
            const selfId = payload.id

            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido")
            }

            if(id === selfId){
                errorCode = 422
                throw new Error("Error! Can't delete yourself");
            }

            const userDatabase = new UserDatabase()
            const searchUser = await userDatabase.findUserById(id)

            if (!searchUser[0]) {
                errorCode = 404
                throw new Error("User not found");
            }
            
            const result = await userDatabase.deleteProfile(id)
            
            res.status(200).send({message:"User successfully deleted! :D"})

        } catch (error) {
            res.status(errorCode).send(error.message)
        }
    }
}