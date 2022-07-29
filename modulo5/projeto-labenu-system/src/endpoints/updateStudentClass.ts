import { Request,Response } from "express";
import { StudentDatabase } from "../database/StudentDatabase";
import { Student } from "../models/Student";


export const updateStudentClass = async(req:Request, res:Response) => {
    let errorCode = 400
    try {
        const id = req.params.id as string
        const newClassroom = req.body.classroom_id as string
    
        const studentDatabase = new StudentDatabase()
        const searchStudent = await studentDatabase.findById(id)

        if(!searchStudent[0]){
            errorCode = 422
            throw new Error("Student not found");
        }

        // DELETE E PUT N DÁ RETORNO NO SQL!
        const result = await studentDatabase.updateClass(id, newClassroom)

        // Por isso cria essa bagaça (instanciamento)
        const updatedStudent = new Student(
            searchStudent[0].id,
            searchStudent[0].name,
            searchStudent[0].email,
            searchStudent[0].birthdate,
            newClassroom as string
        )

        console.log(updatedStudent)

        res.status(200).send({
            message: "Success",
            class: updatedStudent
        })
        
    } catch (error) {
        res.status(errorCode).send({
            message: error.message
        })
    }
}