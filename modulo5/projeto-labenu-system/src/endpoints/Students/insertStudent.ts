import { Request, Response } from "express";
import { StudentDatabase } from "../../database/StudentDatabase";
import { Student } from "../../models/Student";

export const insertStudent = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        
        const name = req.body.name
        const email = req.body.email
        const birthdate = req.body.birthdate
        const classroom_id = req.body.classroom_id

        const student = new Student(
            Date.now().toString(),
            name,
            email,
            new Date(birthdate),
            classroom_id,
        )
        const studentDatabase = new StudentDatabase()
        await studentDatabase.create(student)
        
        res.status(201).send({
            message: "Student was inserted in database",
            student: student
        })

    } catch (error) {
        res.status(errorCode).send({
            message:error.message
        })
    }
}