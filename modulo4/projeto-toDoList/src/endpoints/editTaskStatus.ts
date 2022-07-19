import { Request, Response } from "express";
import connection from "../database/connection";
import { STATUS_LIST } from "../types";

export const editTaskStatus = async(req: Request, res:Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId
        const status = req.body.status as string

        if(!status){
            errorCode = 422
            throw new Error("Parâmetro faltante, adicionar status");
        }

        if(status !== "DOING" && status !=="DONE" && status !== "TO_DO"){
            errorCode = 422
            throw new Error("O status deve possuir um dos três valores: TO_DO, DOING ou DONE");
        }
        
        const [searchTask] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE id = "${taskId}";
        `)
        
        if (searchTask.length === 0){
            errorCode = 404
            throw new Error("Tarefa não encontrada!");
        }

        await connection.raw(`
            UPDATE Tasks
            SET status = "${status}"
            WHERE id = "${taskId}"
        `)

        res.status(200).send({
            message: "Status alterado com sucesso!"
        })

    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
}