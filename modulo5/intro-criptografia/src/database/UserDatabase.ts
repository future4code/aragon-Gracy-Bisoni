import { EDITABLE, IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }

    public getAllUsers = async () => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
        
        return result
    }

    public async searchUser(search: string){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where("nickname", "LIKE", `%${search}%`)

        return result
    }

    public findUserById = async(id:string) => {
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({id})

        return result
    }

    public async updateProfile(id:string, email:string, password: string, nickname:string){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .update({
            email, nickname, password
        })
        .where({id})
    }

    public async deleteProfile(id:string){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .delete()
        .where({id})
    }
}