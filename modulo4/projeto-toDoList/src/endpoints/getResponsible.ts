import { Request, Response } from "express";
import connection from "../database/connection";

export const getResponsible = async(req:Request, res:Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId as string

        const [searchId] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE id = "${taskId}";
        `)

        if(searchId.length === 0){
            errorCode = 404
            throw new Error("Tarefa não encontrada!");
        }

        const [result] = await connection.raw(`
            SELECT
            Users.id,
            Users.nickname 
            FROM Responsibles
            JOIN Users
            ON Responsibles.userId = Users.id
            WHERE taskId = "${taskId}";
        `)

        if(result.length === 0){
            throw new Error("Tarefa ainda não possui um responsável!");
        } else{
            res.status(200).send({
                responsible: result
            })
        }
    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
}