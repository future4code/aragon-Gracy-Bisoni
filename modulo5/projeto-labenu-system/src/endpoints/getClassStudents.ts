import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { StudentDatabase } from "../database/StudentDatabase";

export const getClassStudents = async(req:Request, res:Response)=> {
    let errorCode = 400
    try {
        const classroomId = req.params.classroomId

        const classroomDatabase = new ClassroomDatabase()
        const searchClass = await classroomDatabase.findById(classroomId)

        if(!searchClass[0]){
            errorCode = 422
            throw new Error("Class not found");
        }

        const result = await classroomDatabase.classroomStudents(classroomId)

        res.status(200).send({
            message:"success",
            result: result
        })


    } catch (error) {
        res.status(errorCode).send({
            message: error.message
        })
    }
}