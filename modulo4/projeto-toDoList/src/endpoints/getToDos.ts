import { Request, Response } from "express";
import connection from "../database/connection";

export const getToDos = async(req: Request, res:Response)=> {
    let errorCode = 400
    try {
        const busca = req.query.busca as string
        if(busca){
            const [resultado] = await connection.raw(`
                SELECT * FROM Tasks
                WHERE LOWER(title) LIKE "%${busca.toLowerCase()}%" OR
                LOWER(description) LIKE "%${busca.toLowerCase()}%";
            `)
            return res.status(200).send({tasks: resultado})
        }

        const [resultado] = await connection.raw(`
            SELECT * FROM Tasks;
        `)

        res.status(200).send({tasks: resultado})
    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
}