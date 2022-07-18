import { Request, Response } from "express";
import connection from "../database/connection";

export const getUsers = async (req: Request, res:Response) => {
    let errorCode = 400
    try {
        const busca = req.query.busca as string
        if(busca){
            const [resultado] = await connection.raw(`
                SELECT * FROM Users
                WHERE (name LIKE "%${busca.toLowerCase()}%") OR
                (nickname LIKE "%${busca.toLowerCase()}%");
            `)
            return res.status(200).send({users: resultado})
        }

        const [resultado] = await connection.raw(`
            SELECT * FROM Users;
        `)

        res.status(200).send({users: resultado})
    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
}