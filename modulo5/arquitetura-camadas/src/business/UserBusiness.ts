import { UserDatabase } from "../database/UserDatabase"
import { User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
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
}