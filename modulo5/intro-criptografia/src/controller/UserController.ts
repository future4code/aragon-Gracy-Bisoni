import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const nickname = req.body.nickname as string
            const nickSplit = nickname.split("")
            const email = req.body.email
            const password = req.body.password as string
            const passSplit = password.split("")

            if (!nickname || !email || !password) {
                errorCode = 422
                throw new Error("Missing params")
            }

            if (typeof nickname !== "string" || typeof email !== "string"  || typeof password !== "string") {
                errorCode = 422
                throw new Error("Nickname, email and password need to be string type")
            }

            if(passSplit.length < 6 || nickSplit.length < 3){
                errorCode = 422
                throw new Error("Password needs at least 6 characters, and nickname at least 3."); 
            }

            if(!email.includes("@")){
                errorCode = 422
                throw new Error("Insert a valid email");
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(password)

            const user = new User(
                id,
                nickname,
                email,
                hashPassword,
                USER_ROLES.NORMAL
            )

            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)

            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
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
                userDB.password,
                userDB.role
            )

            const hashManager = new HashManager()

            const isPasswordCorrect = await hashManager.compare(
                password,
                user.getPassword()
            )

            if (!isPasswordCorrect) {
                errorCode = 401
                throw new Error("Senha inválida")
            }


            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
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
                        email: user.email,
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

            if (payload.role !== USER_ROLES.ADMIN) {
                errorCode = 403
                throw new Error("Somente admins podem acessar esse endpoint")
            }

            const userDatabase = new UserDatabase()
            const searchUser = await userDatabase.findUserById(id)

            if (!searchUser[0]) {
                errorCode = 404
                throw new Error("User not found");
            }

            if(id === selfId){
                errorCode = 422
                throw new Error("Error! Can't delete yourself");
            }

            const result = await userDatabase.deleteProfile(id)
            
            res.status(200).send({message:"User successfully deleted! :D"})

        } catch (error) {
            res.status(errorCode).send(error.message)
        }
    }
}