import { UserDatabase } from "../database/UserDatabase"
import { User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {

    // faltando verificação de e-mail já existente ou não no BD
    public signup = async (input:any)=> {
        const name = input.name
        const email = input.email
        const password = input.password

        if (!name || !email || !password) {
            throw new Error("Missing params")
        }

        if (typeof name !== "string") {
            throw new Error("Name must be string type")
        }

        if (typeof email !== "string") {
            throw new Error("Email must be string type")
        }

        if (typeof password !== "string") {
            throw new Error("Password must be string type")
        }

        if (name.length < 3) {
            throw new Error("Name needs to have at least 3 characters")
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("Insert a valid e-mail")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findByEmail(email)
        if (userDB) {
            throw new Error("E-mail already in use")
        }

        await userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: "User created successfully!",
            token
        }

        return response
    }

    public login = async (input: any) => {
        const email = input.email
        const password = input.password

        if (!email || !password) {
            throw new Error("Need to insert e-mail and password")
        }

        if (typeof email !== "string") {
            throw new Error("E-mail must be string type")
        }

        if (typeof password !== "string") {
            throw new Error("Password must be string type")
        }

        if (password.length < 6) {
            throw new Error("Password must have at least 6 characters")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("Insert a valid e-mail")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findByEmail(email)

        if (!userDB) {
            throw new Error("E-mail not found")
        }

        const user = new User(
            userDB.id,
            userDB.name,
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
            throw new Error("Invalid password")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: "Logged in!",
            token
        }

        return response
    }

    public getUsers = async (input: any) => {
        const token = input.token
        const search = input.search || ""
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1
        const offset = limit * (page - 1)

        if (!token) {
            throw new Error("Token faltando")
        }

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.getUsers(
            search,
            sort,
            limit,
            offset
        )

        const users = usersDB.map((userDB:any) => {
            return({
                id: userDB.id,
                name: userDB.name,
                email: userDB.email
            }
            )
        })

        const response = {
            users
        }

        return response
    }

    public deleteUser = async (input: any) => {
        const token = input.token
        const idToDelete = input.idToDelete

        if (!token) {
            throw new Error("Missing token")
        }

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Invalid token")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new Error("Only admins can delete users")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findById(idToDelete)

        if (!userDB) {
            throw new Error("User not found")
        }


        await userDatabase.deleteUserById(idToDelete)

        const response = {
            message: "User deleted succesfully!"
        }

        return response
    }
}