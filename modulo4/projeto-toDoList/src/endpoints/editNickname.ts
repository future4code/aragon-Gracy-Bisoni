import { Request, Response } from "express";
import connection from "../database/connection";

export const editNickname = async(req:Request, res:Response)=> {
    let errorCode = 400
    try {
        const userId = req.params.userId
        const newNickname = req.body.nickname

        if(!newNickname){
            errorCode = 422
            throw new Error("Parâmetro ausente, insira o novo apelido");
        }

        if(typeof newNickname !== 'string'){
            errorCode = 422
            throw new Error("O apelido precisa ser do tipo string"); 
        }

        if(newNickname.length < 3){
            errorCode = 422
            throw new Error("O apelido deve conter ao menos 3 caracteres");
        }

        const [searchUser] = await connection.raw(`
            SELECT * FROM Users
            WHERE id="${userId}";
        `)

        if(searchUser.length === 0){
            errorCode = 404
            throw new Error("Usuário não encontrado");
        }

        await connection.raw(`
            UPDATE Users
            SET nickname="${newNickname}"
            WHERE id = "${userId}";
        `)

        res.status(200).send({
            message: "Apelido alterado com sucesso!"
        })

    } catch (error) {
        res.status(errorCode).send({message:error.message})
    }
}