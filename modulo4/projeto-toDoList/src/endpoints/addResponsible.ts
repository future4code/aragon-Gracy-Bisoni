import { Request, Response } from "express";
import connection from "../database/connection";

export const addResponsible = async(req:Request, res: Response)=> {
    let errorCode = 400
    try {
        const taskId = req.params.taskId
        const userId = req.body.userId

        const [searchTask] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE id = "${taskId}";
        `)

        if(searchTask.length === 0){
            errorCode = 404
            throw new Error("Tarefa não encontrada!");   
        }

        const [searchUser] = await connection.raw(`
            SELECT * FROM Users
            WHERE id = "${userId}";
        `) 

        if(searchUser.length === 0){
            errorCode = 404
            throw new Error("Usuário não encontrado");
        }

        const [searchResponsible] = await connection.raw(`
            SELECT * FROM Responsibles
            WHERE taskId = "${taskId}";
        `)

        if(searchResponsible.length !== 0){
            errorCode = 409
            throw new Error("Tarefa já possui responsável");   
        } else {
            const newAssignment = {
                userId, taskId
            }

            await connection.raw(`
                INSERT INTO Responsibles (userId, taskId)
                VALUES("${newAssignment.userId}","${newAssignment.taskId}");
            `)

            res.status(201).send({
                message: "Atribuição feita com sucesso!",
                return: newAssignment
            })
        }


    } catch (error) {
        res.status(errorCode).send({message:error.message})
    }
}