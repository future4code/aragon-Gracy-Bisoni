import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { Classroom, IClassroomDB } from "../models/Classroom";

export const createClass = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const name = req.body.name
        const module = req.body.module

        if (!name || !module) {
            throw new Error("Invalid body. Missing params: name and/or module")
        }

        const classroom = new Classroom(
            Date.now().toString(),
            name,
            module
        )

        const classroomDatabase = new ClassroomDatabase()
        await classroomDatabase.create(classroom)
        
        res.status(201).send({
            message: "Classroom created",
            classroom: classroom
        })

    } catch (error) {
        res.status(errorCode).send({
            message:error.message
        })
    }
}