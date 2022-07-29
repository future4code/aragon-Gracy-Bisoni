import { Request,Response } from "express";
import { ClassroomDatabase } from "../../database/ClassroomDatabase";
import { Classroom, MODULE } from "../../models/Classroom";

export const updateClassModule = async(req:Request, res:Response) => {
    let errorCode = 400
    try {
        const id = req.params.id as string
        const module = req.body.module as string
    
        const classroomDatabase = new ClassroomDatabase()
        const searchClass = await classroomDatabase.findById(id)

        if(!searchClass[0]){
            errorCode = 422
            throw new Error("Class not found");
        }

        // DELETE E PUT N DÁ RETORNO NO SQL!
        const classroom = await classroomDatabase.update(id, module)

        // Por isso cria essa bagaça (instanciamento)
        const updatedClass = new Classroom(
            searchClass[0].id,
            searchClass[0].name,
            module as MODULE
        )

        res.status(200).send({
            message: "Success",
            class: updatedClass
        })
        
    } catch (error) {
        res.status(errorCode).send({
            message: error.message
        })
    }
}