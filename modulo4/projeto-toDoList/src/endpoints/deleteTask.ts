import { Request, Response } from "express";
import connection from "../database/connection";

export const deleteTask = async(req:Request, res:Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId

        const [searchTask] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE id = "${taskId}";
        `)

        if(searchTask.length === 0){
            errorCode = 404
            throw new Error("Tarefa não encontrada!");
        }
        
        await connection.raw(`
            DELETE FROM Responsibles
            WHERE taskId = "${taskId}";
        `)

        await connection.raw(`
            DELETE FROM Tasks
            WHERE id = "${taskId}";
        `)

        res.status(200).send({message: "Tarefa deletada com sucesso!"})
        
    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
}